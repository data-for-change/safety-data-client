
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
// import { observer } from "mobx-react"
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

interface IProps {
    dataName?:string
    data: any[]
    columns? :any[]
  }
const GroupByTable:FunctionComponent<IProps> = ({ dataName = 'Year', columns, data }) => {
  const { t } = useTranslation();
  // let reactColumns = 1;
  const reactColumns = (columns === undefined) ? [{
    dataField: '_id',
    text: t(dataName),
  }, {
    dataField: 'count',
    text: t('casualties'),
  }] : columns;
  if (data != null) {
    return (
      <div className="groupByTable">
        <BootstrapTable keyField="_id" data={data} columns={reactColumns} headerClasses="table-header" />
      </div>
    );
  }
  return null;
};
export default GroupByTable;
