import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Column,
  createColumnHelper,
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
import { AccessorKeyColumnDef } from '@tanstack/react-table';
import Button from 'react-bootstrap/Button';
import {Table as TableBootstrap}  from "react-bootstrap";
import SmallCard2 from '../atoms/SmallCard2';
import {Accident} from '../../types';
import {exportCSV} from '../../utils/exportCSV';
import DetailsTableFilter from './DetailsTableFilter';
import { useSelector } from "react-redux";
import { selectDataAllInjuries } from "../../stores/casualty/casualtySlice";
import { TFunction } from 'i18next';
import CellRenderer from './CellRenderer';

type AccidentColumn = AccessorKeyColumnDef<Accident, string>;

const getColumnsByWidth = (width: number, allColumns: AccidentColumn[]) => {
  let filteredColumns = [...allColumns];

  if (width < 900) filteredColumns = filteredColumns.filter(col => col.accessorKey !== 'vehicle_vehicle_type_hebrew');
  if (width < 700) filteredColumns = filteredColumns.filter(col => col.accessorKey !== 'street1_hebrew');
  if (width < 500) filteredColumns = filteredColumns.filter(col => col.accessorKey !== 'accident_yishuv_name');
  return filteredColumns;
};

const columnHelper = createColumnHelper<Accident>();

export function getAccidentColumns(t: TFunction): ColumnDef<Accident>[] {
  return [
    {
      accessorKey: 'accident_year',
      cell: (info) => <CellRenderer value={info.getValue()} />,
      header: t('Year'),
      footer: info => info.column.id,
    },
    {
      accessorKey: 'injury_severity_hebrew',
      header: t('Severity'),
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    },
    {
      accessorKey: 'injured_type_hebrew',
      header: t('TypeInjured'),
      footer: info => info.column.id,
    },
    {
      accessorKey: 'accident_yishuv_name',
      header: t('City'),
      footer: info => info.column.id,
    },
    {
      accessorKey: 'street1_hebrew',
      header: t('Street'),
      footer: info => info.column.id,
    },
    {
      accessorKey: 'vehicle_vehicle_type_hebrew',
      header: t('VehicleType'),
      footer: info => info.column.id,
    },
    {
      accessorKey: 'accident_type_hebrew',
      header: t('AccidentType'),
      footer: info => info.column.id,
    },
    {
      accessorKey: 'age_group_hebrew',
      header: t('Age'),
      footer: info => info.column.id,
    },
    {
      accessorKey: 'sex_hebrew',
      header: t('Gender'),
      footer: info => info.column.id,
    },
  ];
}

interface IProps { }

const AccidentsTable: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const dataAllInjuries = useSelector(selectDataAllInjuries);
  console.log('dataAllInjuries', dataAllInjuries.length)
  const defaultDAta2 = dataAllInjuries as Accident[];
  const [data, _setData] = React.useState(() => [...defaultDAta2]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const allColumnsDef = React.useMemo(() => getAccidentColumns(t), [t]);
 
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
  const onExportClick=()=>{
    exportCSV(columns, data);
  }
 
  return (
    <SmallCard2>
    <div className="h-2" />
      <TableBootstrap striped bordered hover>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                      {header.column.getCanFilter() ? (
                        <div>
                          <DetailsTableFilter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </TableBootstrap>
      <Button onClick={onExportClick} className="export-btn">
          {t('export-to-csv')}
      </Button>
      <div className="h-2" />
    <div className="flex items-center gap-2">
      <button
        className="border rounded p-1"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount().toLocaleString()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          min="1"
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  </SmallCard2>
  )
};

export default AccidentsTable;