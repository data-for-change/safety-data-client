import React, { FunctionComponent, lazy, Suspense, } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ErrorBoundary from '../atoms/ErrorBoundary';
import { useStore } from '../../stores/storeConfig';
import Loader from '../atoms/Loader';
import SmallCard2 from '../atoms/SmallCard2';
// import MapPage from '../../pages/MapPage';
interface IProps {
  type: string;
}

const GroupByGraphsPanel = lazy(() => import('../organisms/GroupByGraphsPanel'));
const GroupByTablesPanel = lazy(() => import('../organisms/GroupByTablesPanel'));
const MapAccidents = lazy(() => import('../map/AccidentsMap'));
const AccidentsTable = lazy(() => import('../organisms/AccidentsTable'));
const MyImageGallery = lazy(() => import('../organisms/MyImageGallery'));

const styles = {
  tab: { marginTop: '0.5rem' },
  tabMap: { marginTop: '0.1rem' },
  mapCard: { width: '150px', height: '35px' }
};

export const TabsTemplate: FunctionComponent<IProps> = observer(({ type }) => {
  const { t } = useTranslation();
  const { mapStore, uiStore } = useStore();
  const {currentTab} = uiStore;
  console.log("currentTab", currentTab);
  // const [activeKey] = useState(uiStore.);
  // defaultActiveKey={uiStore.currentTab}
  return (
    <Tabs
      mountOnEnter
      activeKey={currentTab}
      id="main-tabs"
      onSelect={(tabActiveKey: any) => {
        if (tabActiveKey === 'map') {
          // map is renderd only when tab is shown to prevent leaflet bug
          mapStore.isReadyToRenderMap = true;
        } else mapStore.isReadyToRenderMap = false;
        uiStore.setCurrentTab(tabActiveKey);
      }}
    >
      <Tab style={styles.tab} eventKey="charts" title={t('Charts')}>     
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>  
            <GroupByGraphsPanel />
          </Suspense>
        </ErrorBoundary>
      </Tab>
      <Tab style={styles.tab} eventKey="groups" title={t('Groups')}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <GroupByTablesPanel />
          </Suspense>
        </ErrorBoundary>
      </Tab>
      <Tab style={styles.tabMap} eventKey="map" title={t('Map')}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <SmallCard2>           
              <MapAccidents />
            </SmallCard2>
          </Suspense>
        </ErrorBoundary>
      </Tab>
      <Tab style={styles.tab} eventKey="table" title={t('Table')}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <div className="col-auto"><AccidentsTable /></div>
          </Suspense>
        </ErrorBoundary>
      </Tab>
      <Tab style={styles.tab} eventKey="image" title={t('Images')}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <div className="col-auto"><MyImageGallery type={type} /></div>
          </Suspense>
        </ErrorBoundary>
      </Tab>
    </Tabs>
  );
});
export default TabsTemplate;
