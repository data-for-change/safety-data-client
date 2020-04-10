import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { GroupByGraphsPanel } from '../organisms/GroupByGraphsPanel'
import { GroupByTablesPanel } from '../organisms/GroupByTablesPanel'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

interface IProps { }
export const AggregatesPanel: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const style = {
        marginLeft: "0",
        marginRight: "0",
        marginTop: "20px"
    };
    const { filterStore } = useStore();
    let reactData1 = toJS(filterStore.dataByYears)
    if (reactData1.length > 0) {
        return (
            <Tabs defaultActiveKey="home" id="uncontrolled-tab1">
                <Tab eventKey="home" title="Grpahs">
                    <GroupByGraphsPanel />
                </Tab>
                <Tab eventKey="profile" title="Groups">
                    <GroupByTablesPanel />
                </Tab>
            </Tabs>
        )
    }
    else return null;
})