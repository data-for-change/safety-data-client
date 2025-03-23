
import React from 'react';
// import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

interface IProps<TData> {
  dataName?: string;
  data: TData[];
  columns?: ColType[];
}

type GroupTable ={
  _id : string;
  count: number;
}
type ColType ={
  dataField: any;
  text: string
}

const columnHelper = createColumnHelper<GroupTable>();

const generateColumns = ( dataName: string, col2?: any[],) => {
  if (!col2 || !col2.length) {
    // Default column structure
    return [
      columnHelper.accessor('_id', {
        cell: (info) => info.getValue(),
        header: () => <span>{t(dataName)}</span>,
      }),
      columnHelper.accessor('count', {
        cell: (info) => info.getValue(),
        header: () => <span>{t('casualties')}</span>, 
      }),
    ];
  }
  // Dynamic column structure with translation
  return col2.map((col: any) =>
    columnHelper.accessor(col.dataField, {
      cell: (info) => info.getValue(),
      header: () => <span>{t(col.text)}</span>,
    })
  );
};

const GroupByTable = <TData,>({ dataName = 'Year', columns: col2, data }: IProps<TData>) => {
  const columns = generateColumns(dataName, col2);
  const table = useReactTable<GroupTable>({
    data: data as GroupTable[], // Ensure data matches GroupTable type
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
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
      </Table>
    </div>
  );
};


export default GroupByTable;
