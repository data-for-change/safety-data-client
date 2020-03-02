
import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

interface IProps {
  }
export const GroupByTable:React.FC<IProps> = observer(({ children}) => {
    const { t } = useTranslation();
    const columns = [{
        dataField: '_id',
        text: t('Year'),
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