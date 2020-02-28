
import React from 'react'
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx'
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

export const GroupByTable = observer(() => {
    const store = useStore();
    const { t } = useTranslation();
    const reactData = toJS(store.dataByYears)
    const columns = [{
        dataField: '_id',
        text: t('Year'),
    }, {
        dataField: 'count',
        text: t('Casualties'),
    }];
    if (reactData.length >0 ){
        return (<div>
            <BootstrapTable keyField='_id' data={reactData} columns={columns} headerClasses="table-header" />
            </div>
            )
    }
    else return null;
})