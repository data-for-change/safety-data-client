
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

const foramtDataPrecision = (data: any[]) => {
  const data2 = data.map((x) => {
    if (typeof x.count === 'number' && !Number.isInteger(x.count)) {
      return { _id : x._id, count: x.count.toFixed(1) };
    }
    return { _id : x._id, count: x.count};
  });
  return data2;
};

const GroupByTable:FunctionComponent<IProps> = ({ dataName = 'Year', columns, data }) => {
  const data1 = foramtDataPrecision(data);
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
        <BootstrapTable keyField="_id" data={data1} columns={reactColumns} headerClasses="table-header" />
      </div>
    );
  }
  return null;
};

export default GroupByTable;
