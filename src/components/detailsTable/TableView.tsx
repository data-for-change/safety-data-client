import React from 'react';
import {
  Table,
  flexRender,
} from '@tanstack/react-table';
import { Table as TableBootstrap } from "react-bootstrap";
import DetailsTableFilter from './DetailsTableFilter';
import './detailesTable.css';

interface TableViewProps {
    table: Table<any>;
  }
  
  const TableView: React.FC<TableViewProps> = ({ table }) => (
    <div className="table-responsive-wrapper">
      <TableBootstrap striped bordered hover className="table-container">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  <div
                    className={
                      header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                    {header.column.getCanFilter() && (
                      <div className="d-flex align-items-center gap-1 filter-container">
                        <DetailsTableFilter column={header.column} table={table} />
                      </div>
                    )}
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
    </div>
  );
  export default TableView;