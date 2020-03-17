
import React ,{ FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next';
//import { observer } from "mobx-react"
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

interface IProps {
    dataName?:string
    data: any[]
    columns? :any[]
  }
 export const GroupByTable:FunctionComponent<IProps> = ({dataName='Year', columns ,data}) => {
    const { t } = useTranslation();
    if (columns === undefined)
    {
        columns = [{
            dataField: '_id',
            text: t(dataName),
        }, {
            dataField: 'count',
            text: t('Casualties'),
        }];
    }
    if (data!= null ){
        return (<div className="groupByTable">
            <BootstrapTable keyField='_id' data={data} columns={columns} headerClasses="table-header" />
            </div>
            )
    }
    else return null;
}
//export default GroupByTable;