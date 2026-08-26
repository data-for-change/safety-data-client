import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import {
	PaginationState,
	Table,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	ColumnDef,
} from '@tanstack/react-table';
import Button from 'react-bootstrap/Button';
import { Table as TableBootstrap, Card, Tabs, Tab } from "react-bootstrap";
import { Accident, ClusterRow, ModelFilterType, ModelSeverityMode } from '../../types';
import { exportCSV } from '../../utils/exportCSV';
import DetailsTableFilter from '../detailsTable/DetailsTableFilter';
import { selectDataAllInjuries } from "../../stores/casualty/casualtySlice";
import AccidentColumns from '../detailsTable/AccidentColumns';
import PaginationControls from '../detailsTable/PaginationControls';

import TableView from '../detailsTable/TableView';
import AccidentDetailsCard from '../detailsTable/AccidentDetailsCard';
import {
	buildClusterTable,
	clusterPoints,
	calculateKernelDensity,
	buildDensityClustersTable,
	buildSectionScores,
	JUNCTION_HEB_VAL,
} from './modelhelper';
import { JunctionRadiusPicker } from './JunctionRadiusPicker';
import { SeverityModePicker } from './SeverityModePicker';
import ClusterTable from './ClusterTable';
import { ModelMap } from './ModelMap';
import { ClusterFilterTypePicker } from './ClusterFilterTypePicker';
import { MaxClustersPicker } from './MaxClustersPicker';
import SectionsTable from './SectionsTable';
import SectionsMap from './SectionsMap';
import { useStore } from '../../stores/storeConfig';
import { observer } from 'mobx-react-lite';
import { useStreetSections } from './useStreetSections';
import { DataWithLabel } from '../common';
import { Form } from 'react-bootstrap';

const SECTIONS_ALLOWED_EMAIL = ['galraij@gmail.com', 'sejo1981@gmail.com', 'eyalher@gmail.com'];
const isDev = import.meta.env.DEV;

interface IProps { }

type TTabs = 'densityTable' | 'densityMap' | 'clusterTable' | 'clusterMap' | 'sectionTable' | 'sectionMap';

const ModelTabs: React.FC<IProps> = observer(() => {
	const { t } = useTranslation();
	const dataAllInjuries = useSelector(selectDataAllInjuries) as Accident[];
	const { filterStore, userStore } = useStore();
	const {
		locationStore: { cities },
	} = filterStore;
	const showSections = isDev || SECTIONS_ALLOWED_EMAIL.includes(userStore.user?.email.toLowerCase() ?? '');

	const [activeTab, setActiveTab] = React.useState<TTabs>('densityMap');
	const [junctionRadius, setJunctionRadius] = React.useState(50);
	const [heatmapRadius, setHeatmapRadius] = React.useState(200);
	const [severityMode, setSeverityMode] = React.useState<ModelSeverityMode>(1);
	const [filterType, setFilterType] = React.useState<ModelFilterType>(ModelFilterType.All);
	const [maxClusters, setMaxClusters] = React.useState<number>(30);
	const [maxDistanceMeters, setMaxDistanceMeters] = React.useState<number>(20);
	const [sectionStrokeWidth, setSectionStrokeWidth] = React.useState<number>(4);
	const [showAccidentPoints, setShowAccidentPoints] = React.useState<boolean>(true);

	// density
	const denstiyPoints = React.useMemo(() => calculateKernelDensity(dataAllInjuries, heatmapRadius), [dataAllInjuries, heatmapRadius]);
	const clusterTableDensity = React.useMemo(
		() => buildDensityClustersTable(denstiyPoints, filterType, maxClusters),
		[denstiyPoints, filterType, maxClusters],
	);

	// -------- simple Clustering --------
	const clusters = React.useMemo(() => {
		return clusterPoints(dataAllInjuries, junctionRadius);
	}, [dataAllInjuries, junctionRadius]);

	const clusterTable = React.useMemo(
		() =>
			buildClusterTable(
				clusters,
				severityMode,
				filterType,
				maxClusters,
				4, // minValue
			),
		[clusters, severityMode, filterType, maxClusters],
	);

	// -------- Street sections --------
	const selectedCityIds = cities?.arrValues ?? [];
	const { isTelAvivSelected, streetSections, sectionsLoadError, telAvivAccidents, matched, unmatched } = useStreetSections(
		selectedCityIds,
		dataAllInjuries,
		maxDistanceMeters,
	);

	// filter matched accidents by junction/street type (same predicate used for clusters), then cap to top-N sections by score
	const sectionsMatched = React.useMemo(() => {
		const sectionIsJunction = new Map<string, boolean>();
		for (const row of matched) {
			if (row.roadTypeHebrew === JUNCTION_HEB_VAL) sectionIsJunction.set(row.sectionId, true);
			else if (!sectionIsJunction.has(row.sectionId)) sectionIsJunction.set(row.sectionId, false);
		}

		const typeFiltered =
			filterType === ModelFilterType.All
				? matched
				: matched.filter((r) => {
						const isJunction = sectionIsJunction.get(r.sectionId) ?? false;
						return filterType === ModelFilterType.Junctions ? isJunction : !isJunction;
					});

		const scores = buildSectionScores(typeFiltered, severityMode);
		const top = new Set(
			Array.from(scores.entries())
				.sort((a, b) => b[1].score - a[1].score)
				.slice(0, maxClusters)
				.map(([id]) => id),
		);

		return typeFiltered.filter((r) => top.has(r.sectionId));
	}, [matched, filterType, severityMode, maxClusters]);

	const isSectionsTab = activeTab === 'sectionTable' || activeTab === 'sectionMap';

	return (
		<Card className='m-1 p-0 border-0'>
			<Card.Body>
				{/* -------- Controls -------- */}
				<div className='d-flex flex-wrap gap-3 mb-3'>
					<DataWithLabel label={t('HeatmapRadius')}>
						<JunctionRadiusPicker value={heatmapRadius} onChange={setHeatmapRadius} min={100} max={200} step={50} />
					</DataWithLabel>
					<DataWithLabel label={t('JunctionRadius')}>
						<JunctionRadiusPicker value={junctionRadius} onChange={setJunctionRadius} />
					</DataWithLabel>

					<DataWithLabel label={t('SeverityModeLabel')}>
						<SeverityModePicker value={severityMode} onChange={setSeverityMode} />
					</DataWithLabel>

					<DataWithLabel label={t('ClusterType')}>
						<ClusterFilterTypePicker value={filterType} onChange={setFilterType} />
					</DataWithLabel>

					<DataWithLabel label={t('MaxClusters')}>
						<MaxClustersPicker value={maxClusters} onChange={setMaxClusters} />
					</DataWithLabel>

					<DataWithLabel label={t('MaxDistance')}>
						<JunctionRadiusPicker value={maxDistanceMeters} onChange={setMaxDistanceMeters} min={0} max={100} step={5} />
					</DataWithLabel>

					<DataWithLabel label={t('StrokeWidth')}>
						<div className='d-flex align-items-center gap-2'>
							<div className='d-flex' style={{ width: 100 }}>
								<Form.Range
									min={1}
									max={10}
									step={1}
									value={sectionStrokeWidth}
									onChange={(e) => setSectionStrokeWidth(Number(e.target.value))}
								/>
							</div>
							<span className='fw-bold' style={{ fontSize: 14 }}>
								{sectionStrokeWidth}
							</span>
						</div>
					</DataWithLabel>

					<DataWithLabel label={t('ShowAccidentPoints')}>
						<Form.Check
							type='switch'
							id='show-accident-points-switch'
							checked={showAccidentPoints}
							onChange={(e) => setShowAccidentPoints(e.target.checked)}
						/>
					</DataWithLabel>
				</div>

				<Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key as TTabs)} mountOnEnter id='model-tabs'>
					<Tab eventKey='densityTable' title={t('DensityTable')}>
						<ClusterTable clusterTable={clusterTableDensity} />
					</Tab>
					<Tab eventKey='densityMap' title={t('DensityMap')}>
						<ModelMap clusters={clusterTableDensity} isHeat={true} sizeHeat={heatmapRadius} />
					</Tab>

					<Tab eventKey='clusterTable' title={t('ClusterTable')}>
						<ClusterTable clusterTable={clusterTable} />
					</Tab>

					<Tab eventKey='culsterMap' title={t('ClusterMap')}>
						<ModelMap clusters={clusterTable} isHeat={false} sizeHeat={heatmapRadius} />
					</Tab>

					{showSections && (
						<Tab eventKey='sectionTable' title={t('SectionTable')}>
							<SectionsTable
								matched={sectionsMatched}
								unmatched={unmatched}
								streetSections={streetSections}
								loadError={sectionsLoadError}
								telAvivAccidents={telAvivAccidents}
								isTelAvivSelected={isTelAvivSelected}
								severityMode={severityMode}
							/>
						</Tab>
					)}

					{showSections && (
						<Tab eventKey='sectionMap' title={t('SectionMap')}>
							<SectionsMap
								matched={sectionsMatched}
								unmatched={unmatched}
								streetSections={streetSections}
								severityMode={severityMode}
								sectionStrokeWidth={sectionStrokeWidth}
								showAccidentPoints={showAccidentPoints}
							/>
						</Tab>
					)}
				</Tabs>
			</Card.Body>
		</Card>
	);
});

export default ModelTabs;
