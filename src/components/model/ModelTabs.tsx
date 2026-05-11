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
import { buildClusterTable, clusterPoints, calculateKernelDensity, buildDensityClustersTable } from './modelhelper';
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

const SECTIONS_ALLOWED_EMAIL = ['galraij@gmail.com', 'sejo1981@gmail.com'];
const isDev = import.meta.env.DEV;

interface IProps { }

type TTabs = 'densityTable' | 'densityMap' | 'clusterTable' | 'clusterMap' | 'sectionTable' | 'sectionMap';

const ModelTabs: React.FC<IProps> = observer(() => {
	const { t } = useTranslation();
	const dataAllInjuries = useSelector(selectDataAllInjuries) as Accident[];
	const { filterStore, userStore } = useStore();

	const showSections = isDev || SECTIONS_ALLOWED_EMAIL.includes(userStore.user?.email.toLowerCase() ?? '');
	console.log(
		'🚀 ~ SECTIONS_ALLOWED_EMAIL.includes(userStore.user?.email.toLowerCase():',
		SECTIONS_ALLOWED_EMAIL.includes(userStore.user?.email.toLowerCase() ?? ''),
	);
	console.log('🚀 ~ SECTIONS_ALLOWED_EMAIL:', SECTIONS_ALLOWED_EMAIL);
	console.log('🚀 ~ userStore.user?.email.toLowerCase():', userStore.user?.email.toLowerCase());
	console.log('🚀 ~ userStore.user:', userStore.user);
	console.log('🚀 ~ showSections:', showSections);

	const [activeTab, setActiveTab] = React.useState<TTabs>('densityMap');
	const [junctionRadius, setJunctionRadius] = React.useState(50);
	const [heatmapRadius, setHeatmapRadius] = React.useState(200);
	const [severityMode, setSeverityMode] = React.useState<ModelSeverityMode>(1);
	const [filterType, setFilterType] = React.useState<ModelFilterType>(ModelFilterType.All);
	const [maxClusters, setMaxClusters] = React.useState<number>(30);
	const [maxDistanceMeters, setMaxDistanceMeters] = React.useState<number>(20);

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
	const selectedCityIds = filterStore.cities.arrValues ?? [];
	const { isTelAvivSelected, streetSections, sectionsLoadError, telAvivAccidents, matched, unmatched } =
		useStreetSections(selectedCityIds, dataAllInjuries, maxDistanceMeters);

	return (
		<Card className='m-1 p-0 border-0'>
			<Card.Body>
				{/* -------- Controls -------- */}
				<div className='d-flex flex-wrap gap-4 mb-3'>
					<JunctionRadiusPicker
						value={heatmapRadius}
						onChange={setHeatmapRadius}
						text={'heatmap radius'}
						min={100}
						max={200}
						step={50}
					/>
					<JunctionRadiusPicker value={junctionRadius} onChange={setJunctionRadius} text='Junction radius' />

					<SeverityModePicker value={severityMode} onChange={setSeverityMode} />

					<ClusterFilterTypePicker value={filterType} onChange={setFilterType} />

					<MaxClustersPicker value={maxClusters} onChange={setMaxClusters} />
					{(activeTab === 'sectionTable' || activeTab === 'sectionMap') && (
						<JunctionRadiusPicker
							value={maxDistanceMeters}
							onChange={setMaxDistanceMeters}
							text='Max distance'
							min={0}
							max={100}
							step={5}
						/>
					)}
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
								matched={matched}
								unmatched={unmatched}
								streetSections={streetSections}
								loadError={sectionsLoadError}
								telAvivAccidents={telAvivAccidents}
								isTelAvivSelected={isTelAvivSelected}
							/>
						</Tab>
					)}

					{showSections && (
						<Tab eventKey='sectionMap' title={t('SectionMap')}>
							<SectionsMap matched={matched} unmatched={unmatched} streetSections={streetSections} />
						</Tab>
					)}
				</Tabs>
			</Card.Body>
		</Card>
	);
});

export default ModelTabs;
