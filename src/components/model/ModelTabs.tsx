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
	buildMunicipalCrossroads,
	buildMunicipalCrossroadRows,
	buildOsmStreetRows,
	filterNearCrossroads,
} from './modelhelper';
import ModelControls from './ModelControls';
import ClusterTable from './ClusterTable';
import { ModelMap } from './ModelMap';
import SectionsTable from './SectionsTable';
import SectionsMap from './SectionsMap';
import { useStore } from '../../stores/storeConfig';
import { observer } from 'mobx-react-lite';
import { useStreetSections } from './useStreetSections';
import type { MatchedAccidentRow } from '../../services/accidentSectionMatcher';

const SECTIONS_ALLOWED_EMAIL = ['galraij@gmail.com', 'sejo1981@gmail.com', 'eyalher@gmail.com'];
const isDev = import.meta.env.DEV;

const EMPTY_DENSITY: ReturnType<typeof calculateKernelDensity> = [];
const EMPTY_CLUSTERS: Accident[][] = [];
const EMPTY_ROWS: ClusterRow[] = [];
const EMPTY_MATCHED: MatchedAccidentRow[] = [];

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

	// only compute what the active tab needs
	const isDensityTab = activeTab === 'densityTable' || activeTab === 'densityMap';
	const isClusterTab = activeTab === 'clusterTable' || activeTab === 'clusterMap';
	const isSectionsTab = activeTab === 'sectionTable' || activeTab === 'sectionMap';

	// density
	const denstiyPoints = React.useMemo(
		() => (isDensityTab ? calculateKernelDensity(dataAllInjuries, heatmapRadius) : EMPTY_DENSITY),
		[isDensityTab, dataAllInjuries, heatmapRadius],
	);
	const clusterTableDensity = React.useMemo(
		() => buildDensityClustersTable(denstiyPoints, filterType, maxClusters),
		[denstiyPoints, filterType, maxClusters],
	);

	// -------- simple Clustering --------
	const clusters = React.useMemo(() => {
		return isClusterTab ? clusterPoints(dataAllInjuries, junctionRadius) : EMPTY_CLUSTERS;
	}, [isClusterTab, dataAllInjuries, junctionRadius]);

	// -------- Street sections --------
	const selectedCityIds = cities?.arrValues ?? [];
	const {
		isTelAvivSelected,
		streetSections,
		sectionsLoadError,
		telAvivAccidents,
		matched,
		unmatched,
		osmStreets,
		osmMatched,
		osmUnmatched,
	} = useStreetSections(selectedCityIds, dataAllInjuries, maxDistanceMeters, isClusterTab || isSectionsTab);

	// Tel Aviv: crossroads come from the municipal segments and streets from OSM; elsewhere (or until the data loads) use the CBS clusters
	const municipalCrossroads = React.useMemo(() => (streetSections ? buildMunicipalCrossroads(streetSections) : []), [streetSections]);
	const hasTelAvivModelData = isTelAvivSelected && !!streetSections && !!osmStreets;

	// full ranked lists, independent of maxClusters/filterType (those only slice them)
	// the junction radius only matters for the All and Crossroads modes
	const needsCrossroadRows =
		hasTelAvivModelData &&
		((isClusterTab && (filterType === ModelFilterType.All || filterType === ModelFilterType.Crossroads)) ||
			(isSectionsTab && (filterType === ModelFilterType.All || filterType === ModelFilterType.Crossroads)));
	const allCrossroadRows = React.useMemo(
		() =>
			needsCrossroadRows
				? buildMunicipalCrossroadRows(municipalCrossroads, telAvivAccidents, junctionRadius, severityMode, Infinity)
				: EMPTY_ROWS,
		[needsCrossroadRows, municipalCrossroads, telAvivAccidents, junctionRadius, severityMode],
	);
	const allStreetRows = React.useMemo(
		() => (hasTelAvivModelData && isClusterTab ? buildOsmStreetRows(osmMatched, severityMode, Infinity) : EMPTY_ROWS),
		[hasTelAvivModelData, isClusterTab, osmMatched, severityMode],
	);

	const clusterTable = React.useMemo(() => {
		if (!hasTelAvivModelData) return buildClusterTable(clusters, severityMode, filterType, maxClusters);

		switch (filterType) {
			case ModelFilterType.Segments:
				return [];
			case ModelFilterType.Crossroads:
				return allCrossroadRows.slice(0, maxClusters);
			case ModelFilterType.Streets:
				return allStreetRows.slice(0, maxClusters);
			case ModelFilterType.All:
			default:
				return [...allCrossroadRows.slice(0, maxClusters / 2), ...allStreetRows.slice(0, maxClusters / 2)];
		}
	}, [hasTelAvivModelData, clusters, severityMode, filterType, maxClusters, allCrossroadRows, allStreetRows]);

	// sections tabs: All/Segments -> all municipal segments, Crossroads -> accidents within the radius of a crossroad pin, Streets -> OSM streets
	const useOsmSections = filterType === ModelFilterType.Streets;
	const sectionsSource = useOsmSections ? osmStreets : streetSections;
	const sectionsUnmatched = useOsmSections ? osmUnmatched : unmatched;

	// Crossroads mode on the section map: the top-N crossroad pins (drawn as circles instead of segment lines)
	const mapCrossroads = React.useMemo(
		() => {
			if (filterType === ModelFilterType.Crossroads) return allCrossroadRows.slice(0, maxClusters);
			// All: the top junctions are drawn over the segments (half of the limit, as in the cluster tabs)
			if (filterType === ModelFilterType.All) return allCrossroadRows.slice(0, maxClusters / 2);
			return EMPTY_ROWS;
		},
		[filterType, allCrossroadRows, maxClusters],
	);

	// cap to the top-N sections by score
	// the junction radius only applies to Crossroads; Segments/All/Streets are affected only by maxDistanceMeters (via matched)
	const sectionsRadius = filterType === ModelFilterType.Crossroads ? junctionRadius : 0;
	const sectionsMatched = React.useMemo(() => {
		if (!isSectionsTab) return EMPTY_MATCHED;
		if (filterType === ModelFilterType.Crossroads) {
			// only the accidents inside the radius of the shown crossroads
			const pins = mapCrossroads.map((c) => ({ lat: c.latitude, lng: c.longitude, name: c.name, ends: 0 }));
			return filterNearCrossroads(matched, pins, sectionsRadius);
		}

		const source = useOsmSections ? osmMatched : matched;
		const scores = buildSectionScores(source, severityMode);
		const top = new Set(
			Array.from(scores.entries())
				.sort((a, b) => b[1].score - a[1].score)
				.slice(0, maxClusters)
				.map(([id]) => id),
		);

		return source.filter((r) => top.has(r.sectionId));
	}, [isSectionsTab, matched, osmMatched, useOsmSections, filterType, mapCrossroads, sectionsRadius, severityMode, maxClusters]);

	return (
		<Card className='m-1 p-0 border-0'>
			<Card.Body>
				{/* -------- Controls -------- */}
				<ModelControls
					heatmapRadius={heatmapRadius}
					onHeatmapRadiusChange={setHeatmapRadius}
					junctionRadius={junctionRadius}
					onJunctionRadiusChange={setJunctionRadius}
					severityMode={severityMode}
					onSeverityModeChange={setSeverityMode}
					filterType={filterType}
					onFilterTypeChange={setFilterType}
					maxClusters={maxClusters}
					onMaxClustersChange={setMaxClusters}
					maxDistanceMeters={maxDistanceMeters}
					onMaxDistanceMetersChange={setMaxDistanceMeters}
					sectionStrokeWidth={sectionStrokeWidth}
					onSectionStrokeWidthChange={setSectionStrokeWidth}
					showAccidentPoints={showAccidentPoints}
					onShowAccidentPointsChange={setShowAccidentPoints}
				/>

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

					<Tab eventKey='clusterMap' title={t('ClusterMap')}>
						<ModelMap clusters={clusterTable} isHeat={false} sizeHeat={heatmapRadius} />
					</Tab>

					{showSections && (
						<Tab eventKey='sectionTable' title={t('SectionTable')}>
							<SectionsTable
								matched={sectionsMatched}
								unmatched={sectionsUnmatched}
								streetSections={sectionsSource}
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
								unmatched={sectionsUnmatched}
								streetSections={sectionsSource}
								crossroads={filterType === ModelFilterType.Crossroads || filterType === ModelFilterType.All ? mapCrossroads : undefined}
								showSegments={filterType !== ModelFilterType.Crossroads}
								crossroadRadius={junctionRadius}
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
