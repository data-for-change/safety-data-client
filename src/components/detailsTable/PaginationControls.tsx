import React from 'react';
import { Table } from '@tanstack/react-table';
import { t } from 'i18next';

interface PaginationControlsProps<T> {
  table: Table<T>;
}

const PaginationControls = <T,>({ table }: PaginationControlsProps<T>) => {
  return (
    <>
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

      <span className="d-flex align-items-center gap-1">
        <span>{t('Page')}</span>
        <strong>
          {table.getState().pagination.pageIndex + 1} {t('of')+' '}
          {table.getPageCount().toLocaleString()}
        </strong>
      </span>

      <span className="d-flex align-items-center gap-1">
        | {t('Go_to_page')}:
        <input
          type="number"
          min="1"
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>

      <select
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value));
        }}
        className="form-select w-auto"
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            {t('Show')} {pageSize}
          </option>
        ))}
      </select>
    </>
  );
};

export default PaginationControls;
