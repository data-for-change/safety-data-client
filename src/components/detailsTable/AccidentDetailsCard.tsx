import React from 'react';
import {
  Table,
  flexRender,
} from '@tanstack/react-table';
import { Table as TableBootstrap, Card } from "react-bootstrap";
import './detailesTable.css';

interface AccidentDetailsCardProps {
  table: Table<any>;
}

const AccidentDetailsCard: React.FC<AccidentDetailsCardProps> = ({ table }) => (
  <div className="card-layout p-2">
    {table.getRowModel().rows.map(row => (
      <Card key={row.id} className="mb-2 p-2 shadow-sm border">
        {row.getVisibleCells().map(cell => (
          <div key={cell.id} className="mb-1">
            <strong>{cell.column.columnDef.header as string}:</strong>{' '}
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        ))}
      </Card>
    ))}
  </div>
);
export default AccidentDetailsCard;