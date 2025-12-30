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
import { buildClusterTable, clusterPoints , calculateKernelDensity, buildDensityClustersTable} from './modelhelper';
import { JunctionRadiusPicker } from './JunctionRadiusPicker';
import { SeverityModePicker } from './SeverityModePicker';
import ClusterTable from './ClusterTable';
import { ModelMap } from './ModelMap';
import { ClusterFilterTypePicker } from './ClusterFilterTypePicker';
import { MaxClustersPicker } from './MaxClustersPicker';

interface IProps { }

const ModelTabs: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const dataAllInjuries = useSelector(selectDataAllInjuries) as Accident[];

  const [activeTab, setActiveTab] = React.useState<'table' | 'map'>('table');
  const [junctionRadius, setJunctionRadius] = React.useState(50);
  const [heatmapRadius, setHeatmapRadius] = React.useState(100);
  const [severityMode, setSeverityMode] =
    React.useState<ModelSeverityMode>(1);
  const [filterType, setFilterType] =
    React.useState<ModelFilterType>(ModelFilterType.All);
  const [maxClusters, setMaxClusters] =
    React.useState<number>(80);

  // density 
  const denstiyPoints = React.useMemo(
    () => calculateKernelDensity(dataAllInjuries, heatmapRadius),
    [dataAllInjuries, heatmapRadius]
  );
  const clusterTableDensity = React.useMemo(
    () => buildDensityClustersTable(denstiyPoints,filterType, maxClusters),
    [denstiyPoints, filterType, maxClusters]
  );

  // -------- simple Clustering --------
  const clusters = React.useMemo(
    () => clusterPoints(dataAllInjuries, junctionRadius),
    [dataAllInjuries, junctionRadius]
  );

  const clusterTable = React.useMemo(
    () =>
      buildClusterTable(
        clusters,
        severityMode,
        filterType,
        maxClusters,
        4 // minValue
      ),
    [clusters, severityMode,filterType, maxClusters ]
  );

  return (
    <Card className="m-1 p-0 border-0">
      <Card.Body>
        {/* -------- Controls -------- */}
       <div className="d-flex flex-wrap gap-4 mb-3">
          <JunctionRadiusPicker
            value={junctionRadius}
            onChange={setJunctionRadius}
            text = "Junction radius"
          />
          <JunctionRadiusPicker
            value={heatmapRadius}
            onChange={setHeatmapRadius}
            text = {"heatmap radius"}
            min = {100}
            max = {200}
            step = {50}
          />

          <SeverityModePicker
            value={severityMode}
            onChange={setSeverityMode}
          />

          <ClusterFilterTypePicker
            value={filterType}
            onChange={setFilterType}
          />

          <MaxClustersPicker
            value={maxClusters}
            onChange={setMaxClusters}
          />
        </div>

        <Tabs
        activeKey={activeTab}
        onSelect={key => setActiveTab(key as 'table' | 'map')}
        mountOnEnter
        id="model-tabs"
      >
        <Tab eventKey="tableDensity" title={t('TableDensity')}>
          <ClusterTable clusterTable={clusterTableDensity} />
        </Tab>
        <Tab eventKey="hetmap" title={t('HeatMap')}>
          <ModelMap clusters={clusterTableDensity}/> 
        </Tab>

        <Tab eventKey="table" title={t('Table')}>
          <ClusterTable clusterTable={clusterTable} />
        </Tab>

        <Tab eventKey="map" title={t('Map')}>
          <ModelMap clusters={clusterTable}/> 
        </Tab> 
      </Tabs>
      </Card.Body>
    </Card>
  );
};

export default ModelTabs;