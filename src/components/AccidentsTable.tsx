
import React from 'react'
import { toJS } from 'mobx'
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

export const AccidentsTable = observer(() => {
    const store = useStore();
    const reactMarkers = toJS(store.markers)
    const columns = [{
        dataField: '_id',
        text: 'ID',
        hidden : true
    }, {
        dataField: 'accident_year',
        text: 'Year',
        sort: true
    }, {
        dataField: 'accident_yishuv_name',
        text: 'City',
        sort: true
    }, {
        dataField: 'street1_hebrew',
        text: 'Street',
        sort: true
    }, {
        dataField: 'injured_type_hebrew1',
        text: 'Type',
        sort: true
    }, {
        dataField: 'age_group_hebrew',
        text: 'Age',
        sort: true
    }, {
        dataField: 'sex_hebrew',
        text: 'Gender',
        sort: true
    }];
    if (reactMarkers.length >0 ){
        return (<div>
             <h4>Found {reactMarkers.length} Accidesnt:</h4>
            <BootstrapTable keyField='_id' data={reactMarkers} columns={columns} pagination={ paginationFactory()}  headerClasses="table-header" />
            </div>
            )
    }
    else return null;
})
