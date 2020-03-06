import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import MapAccidents from '../organisms/MapAccidents'
import { AccidentsTable } from '../organisms/AccidentsTable'
import { GroupByGraphsPanel } from '../organisms/GroupByGraphsPanel'
import { GroupByTablesPanel } from '../organisms/GroupByTablesPanel'
import { useStore } from '../../stores/storeConfig'

interface IProps { 
    defaultKey? :string
}

export const TabsTemplate: React.FC<IProps> = observer(({defaultKey="charts"}) => {
    const style = {
        marginTop: "20px"
    }
    const { t } = useTranslation();
    const [activeKey] = useState(defaultKey);
    const store = useStore();
    return (
        <Tabs defaultActiveKey={activeKey} id="main-tabs"
            onSelect={(activeKey: any) => {
                if (activeKey === "map") {
                    //map is renderd only when tab is shown to prevent leaflet bug
                    store.isReadyToRenderMap = true;
                }
            }}
        >
            <Tab style={style} eventKey="charts" title={t("Charts")}>
                <GroupByGraphsPanel />
            </Tab>
            <Tab style={style} eventKey="grouptables" title={t("Groups")}>
                <GroupByTablesPanel />
            </Tab>
            <Tab style={style} eventKey="map" title={t("Map")}>
                <MapAccidents />
            </Tab>
            <Tab style={style} eventKey="table" title={t("Table")}>
                <div className="col-auto"><AccidentsTable /></div>
            </Tab>
        </Tabs>
    )
})
