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
import { Table as TableBootstrap, Card } from "react-bootstrap";
import { Accident, ClusterRow, ModelSeverityMode } from '../../types';
import { exportCSV } from '../../utils/exportCSV';
import DetailsTableFilter from '../detailsTable/DetailsTableFilter';
import { selectDataAllInjuries } from "../../stores/casualty/casualtySlice";
import AccidentColumns from '../detailsTable/AccidentColumns';
import PaginationControls from '../detailsTable/PaginationControls';

import TableView from '../detailsTable/TableView';
import AccidentDetailsCard from '../detailsTable/AccidentDetailsCard';
import { buildClusterTable, clusterPoints } from './modelhelper';
import { JunctionRadiusPicker } from './JunctionRadiusPicker';
import { SeverityModePicker } from './SeverityModePicker';
import ClusterTable from './ClusterTable';

interface IProps { }

const ModelMainTab: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const dataAllInjuries = useSelector(selectDataAllInjuries) as Accident[];

  const [junctionRadius, setJunctionRadius] = React.useState(50);
  const [severityMode, setSeverityMode] =
    React.useState<ModelSeverityMode>(1);

  // -------- Clustering --------
  const clusters = React.useMemo(
    () => clusterPoints(dataAllInjuries, junctionRadius),
    [dataAllInjuries, junctionRadius]
  );

  const clusterTable = React.useMemo(
    () =>
      buildClusterTable(
        clusters,
        4, // minValue
        severityMode
      ),
    [clusters, severityMode]
  );

  return (
    <Card className="m-1 p-0 border-0">
      <Card.Body>
        {/* -------- Controls -------- */}
        <div className="d-flex flex-wrap gap-4 mb-3">
          <JunctionRadiusPicker
            value={junctionRadius}
            onChange={setJunctionRadius}
          />

          <SeverityModePicker
            value={severityMode}
            onChange={setSeverityMode}
          />
        </div>

        {/* -------- Table -------- */}
        <ClusterTable clusterTable={clusterTable} />
      </Card.Body>
    </Card>
  );
};

export default ModelMainTab;