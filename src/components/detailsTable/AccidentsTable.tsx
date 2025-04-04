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

interface IProps { }

const AccidentsTable: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const dataAllInjuries = useSelector(selectDataAllInjuries) as Accident[];

  const [data, setData] = React.useState(() => [...dataAllInjuries]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {
    setData([...dataAllInjuries]);
  }, [dataAllInjuries]);

  const allColumnsDef = React.useMemo(() => AccidentColumns(t), [t]);

  // Function to handle dynamic column layout based on window width
  const getColumnsByWidth = (width: number, columns: ColumnDef<Accident>[]) => {
    // Adjust logic based on width to modify columns visibility or configuration
    if (width < 600) {
      // Example: return a smaller subset of columns for small screens
      return columns.slice(0, 4); // Adjust based on your logic
    }
    return columns; // Default to all columns for larger screens
  };

  const [columns, setColumns] = useState(() => getColumnsByWidth(window.innerWidth, allColumnsDef));
  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnsByWidth(window.innerWidth, allColumnsDef));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <TableBootstrap striped bordered hover className="table-container">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                    {header.column.getCanFilter() ? (
                      <div className="d-flex align-items-center gap-1 filter-container">
                        <DetailsTableFilter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-body">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableBootstrap>

      <Card.Footer className="bg-white p-2">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <Button onClick={onExportClick} className="export-btn">
            {t('export-to-csv')}
          </Button>
          <PaginationControls table={table} />
        </div>
      </Card.Footer>
    </Card>
  )
};

export default AccidentsTable;