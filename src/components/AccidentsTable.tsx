
import React from 'react'
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx'
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
// @ts-ignore
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

interface IProps { }

export const AccidentsTable = observer((props: IProps) => {
    const store = useStore();
    const { t } = useTranslation();
    const divStyle = {
        display: 'flex',
        justifyContent: 'flex-end'
      };
    const reactMarkers = toJS(store.markers)
    const { ExportCSVButton } = CSVExport;
    const columns = [{
        dataField: '_id',
        text: 'ID',
        hidden: true
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
    if (reactMarkers.length > 0) {
        return (<div>
            <h4>{t('Found')} {reactMarkers.length} {t('Casualties')} </h4>
            <ToolkitProvider
                keyField="id"
                data={reactMarkers}
                columns={columns}
                exportCSV
            >
                {
                    (props: any) => (
                        <div>
                            <BootstrapTable {...props.baseProps} pagination={ paginationFactory()}  headerClasses="table-header"/>
                            <hr />
                            <div style={divStyle}>
                            <ExportCSVButton className="button-sm" {...props.csvProps}>{t('export-to-csv')}</ExportCSVButton>
                            </div>
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
        )
    }
    else return null;
})
