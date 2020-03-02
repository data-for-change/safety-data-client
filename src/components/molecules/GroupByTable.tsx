
import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

interface IProps {
    dataName?:string
  }
export const GroupByTable:React.FC<IProps> = observer(({dataName='Year', children}) => {
    const { t } = useTranslation();
    const columns = [{
        dataField: '_id',
        text: t(dataName),
    }, {
        dataField: 'count',
        text: t('Casualties'),
    }];
    if (children!= null ){
        return (<div className="groupByTable">
            <BootstrapTable keyField='_id' data={children} columns={columns} headerClasses="table-header" />
            </div>
            )
    }
    else return null;
})