
import React from 'react'
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx'
import { observer } from "mobx-react"
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import { useStore } from '../../stores/storeConfig'

interface IProps {
    type? :number 
    title?:string
  }
export const GroupByTable:React.FC<IProps> = observer(({title, type =0}) => {
    const store = useStore();
    const { t } = useTranslation();
    //const rtitle = title ? <div>{title}</div> : null 
    let reactData = null;
    if (type ===0)
        reactData = toJS(store.dataByYears)
    else 
        reactData = toJS(store.dataFilterdByYears)

    const columns = [{
        dataField: '_id',
        text: t('Year'),
    }, {
        dataField: 'count',
        text: t('Casualties'),
    }];
    if (reactData.length >0 ){
        return (<div className="groupByTable">
            {title}
            <BootstrapTable keyField='_id' data={reactData} columns={columns} headerClasses="table-header" />
            </div>
            )
    }
    else return null;
})