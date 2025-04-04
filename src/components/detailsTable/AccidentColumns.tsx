import React from 'react';
import { TFunction } from 'i18next';
import {
  ColumnDef,
} from '@tanstack/react-table';
import {Accident} from '../../types';
import CellRenderer from './CellRenderer';

const AccidentColumns = (t: TFunction): ColumnDef<Accident>[] => {
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
};
export default AccidentColumns;