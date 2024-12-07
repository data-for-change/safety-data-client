
import React, { FunctionComponent } from 'react';
// import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

interface IProps {
    dataName?:string;
    data: any[];
    columns? :any[];
  }

const foramtDataPrecision = (data: any[]) => {
  const data2 = data.map((x) => {
    if (typeof x.count === 'number' && !Number.isInteger(x.count)) {
      return { _id : x._id, count: x.count.toFixed(1) };
    }
    return { _id : x._id, count: x.count};
  });
  return data2;
};

type GroupTable ={
  _id : string;
  count: number;
}

const columnHelper = createColumnHelper<GroupTable>();
const columns = [
  columnHelper.accessor('_id', {
    cell: info => info.getValue(),
    header: () => <span>שנה</span>,
  }),
  columnHelper.accessor('count', {
    cell: info => info.getValue(),
    header: () => <span>נפגעים</span>,
  }),
]

// const GroupByTable:FunctionComponent<IProps> = ({ dataName = 'Year', columns, data }) => {
//   // do format only grp1 and not grpBy2
//   const data1 = (columns === undefined) ? foramtDataPrecision(data) : data;
//   const { t } = useTranslation();
//   // let reactColumns = 1;
//   const reactColumns = (columns === undefined) ? [{
//     dataField: '_id',
//     text: t(dataName),
//   }, {
//     dataField: 'count',
//     text: t('casualties'),
//   }] : columns;
//   if (data != null) {
//     return (
//       <div className="groupByTable">
//         <BootstrapTable keyField="_id" data={data1} columns={reactColumns} headerClasses="table-header" />
//       </div>
//     );
//   }
//   return null;
// };

const GroupByTable:FunctionComponent<IProps> = ({ dataName = 'Year', columns: col2, data }) => {
  // const [data, _setData] = React.useState(() => [...data2])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
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
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
};

export default GroupByTable;
