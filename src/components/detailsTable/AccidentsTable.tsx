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
import { Accident } from '../../types';
import { exportCSV } from '../../utils/exportCSV';
import DetailsTableFilter from './DetailsTableFilter';
import { selectDataAllInjuries } from "../../stores/casualty/casualtySlice";
import AccidentColumns from './AccidentColumns';
import PaginationControls from './PaginationControls';
import './detailesTable.css';
import TableView from './TableView';
import AccidentDetailsCard from './AccidentDetailsCard';

interface IProps { }

const AccidentsTable: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const dataAllInjuries = useSelector(selectDataAllInjuries) as Accident[];

  const [data, setData] = React.useState(() => [...dataAllInjuries]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {
    setData([...dataAllInjuries]);
  }, [dataAllInjuries]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = React.useMemo(() => AccidentColumns(t), [t]);
  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  })
  const onExportClick = () => {
    exportCSV(columns, dataAllInjuries);
  }

  return (
    <Card className="m-1 p-0 border-0">
      <Card.Body>
        {isSmallScreen ? (
          <AccidentDetailsCard table={table} />
        ) : (
          <TableView table={table} />
        )}
      </Card.Body>
      <Card.Footer className="bg-white p-2">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <PaginationControls table={table} />
          <Button onClick={onExportClick} className="export-btn">
            {t('export-to-csv')}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
};

export default AccidentsTable;