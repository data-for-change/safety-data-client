import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import {
  Column,
  ColumnDef,
  createColumnHelper,
  PaginationState,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useStore } from '../../stores/storeConfig';
import {Table as TableBootstrap}  from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const getColumnsByWidth = (width: number, t: any) => {
  const columns1 = [{
    dataField: '_id',
    text: 'ID',
    hidden: true,
  }, {
    dataField: 'accident_year',
    text: t('Year'),
    sort: true,
  }, {
    dataField: 'injury_severity_hebrew',
    text: t('Severity'),
    sort: true,
  }, {
    dataField: 'injured_type_hebrew',
    text: t('TypeInjured'),
    sort: true,
  }];
  const colCity = {
    dataField: 'accident_yishuv_name',
    text: t('City'),
    sort: true,
  };
  const colStreet = {
    dataField: 'street1_hebrew',
    text: t('Street'),
    sort: true,
  };
  const columns3 = [{
    dataField: 'vehicle_vehicle_type_hebrew',
    text: t('Vehicle'),
    sort: true,
  }, {
    dataField: 'accident_type_hebrew',
    text: t('AccidentType'),
    sort: true,
  }];
  const columns4 = [{
    dataField: 'age_group_hebrew',
    text: t('Age'),
    sort: true,
  }, {
    dataField: 'sex_hebrew',
    text: t('Gender'),
    sort: true,
  }];

  let columns = columns1;
  if (width > 500) columns.splice(2, 0, colCity);
  if (width > 700) columns.splice(3, 0, colStreet);
  if (width > 900) columns = columns.concat(columns3);
  columns = columns.concat(columns4);
  return columns;
};

type InjuredPerson = {
  _id: string;
  accident_year: string;
  injury_severity_hebrew: string;
  injured_type_hebrew: string;
  accident_yishuv_name: string;
  street1_hebrew: string;
  vehicle_vehicle_type_hebrew: string;
  accident_type_hebrew: string;
  age_group_hebrew: string;
  sex_hebrew: string;
};

const columnHelper = createColumnHelper<InjuredPerson>();



interface IProps { }
// const AccidentsTable: React.FC<IProps> = observer(() => {
//   const { filterStore } = useStore();
//   const { t } = useTranslation();
//   const divStyle = {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     marginBottom: '1rem'
//   };
//   const reactMarkers = toJS(filterStore.dataAllInjuries);
//   //const { ExportCSVButton } = CSVExport;
//   const [columns, setColumns] = useState(getColumnsByWidth(window.innerWidth, t));
//   React.useEffect(() => {
//     function handleResize() {
//       const cols = getColumnsByWidth(window.innerWidth, t);
//       setColumns(cols);
//     }
//     window.addEventListener('resize', handleResize);
//     return (() => { window.removeEventListener('resize', handleResize); });
//   });

//   // console.log(reactMarkers, filterStore.cityResult)
//   if (reactMarkers.length > 0) {
//     return (
//       <div>
//         <SmallCard2>
//           <ToolkitProvider
//             keyField="_id"
//             data={reactMarkers}
//             columns={columns}
//             exportCSV>
//             {(props: any) => (
//               <div>
//                 <div style={divStyle}>
//                   <ExportCSVButton
//                     className="button-sm" {...props.csvProps}>
//                     {t('export-to-csv')}
//                   </ExportCSVButton>
//                 </div>
//                 <BootstrapTable
//                   pagination={paginationFactory()}
//                   {...props.baseProps}
//                   headerClasses="table-header"
//                 />
//                 {/* <hr /> */}
//               </div>)}
//           </ToolkitProvider>
//         </SmallCard2>
//       </div>
//     );
//   }
//   return null
// });
const AccidentsTable: React.FC<IProps> = observer(() => {
  const { filterStore } = useStore();
  const { t } = useTranslation();
  const reactMarkers = toJS(filterStore.dataAllInjuries);
  //@ts-ignore
  const defaultDAta2 = reactMarkers as InjuredPerson[];
  const [data, _setData] = React.useState(() => [...defaultDAta2]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = [

    columnHelper.accessor('accident_year', {
      cell: info => <i>{info.getValue()}</i>,
      header: t('Year'),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('injury_severity_hebrew', {
      header: t('Severity'),
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('injured_type_hebrew', {
      header: t('TypeInjured'),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('accident_yishuv_name', {
      header: t('City'),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('street1_hebrew', {
      header: t('Street'),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('vehicle_vehicle_type_hebrew', {
      header: t('VehicleType'),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('accident_type_hebrew', {
      header: t('AccidentType'),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('age_group_hebrew', {
      header: t('Age'),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('sex_hebrew', {
      header: t('Gender'),
      footer: info => info.column.id,
    }),
  ];
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

  return (
    <div className="p-2">
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
                        <Filter column={header.column} table={table} />
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
  </div>
  )
});

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2" onClick={e => e.stopPropagation()}>
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      className="w-36 border shadow rounded"
      onChange={e => column.setFilterValue(e.target.value)}
      onClick={e => e.stopPropagation()}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  )
};

export default AccidentsTable;