import React, { FunctionComponent, lazy, Suspense, } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ErrorBoundary from '../atoms/ErrorBoundary';
import { useStore } from '../../stores/storeConfig';
import Loader from '../atoms/Loader';

interface IProps {
  type: string;
}

const GroupByGraphsPanel = lazy(() => import('../organisms/GroupByGraphsPanel'));
const GroupByTablesPanel = lazy(() => import('../organisms/GroupByTablesPanel'));
const MapAccidents = lazy(() => import('../organisms/MapAccidents'));
const AccidentsTable = lazy(() => import('../organisms/AccidentsTable'));
const MyImageGallery = lazy(() => import('../organisms/MyImageGallery'));

export const TabsTemplate: FunctionComponent<IProps> = observer(({ type }) => {
  const style = {
    // marginTop: '20px',
  };
  const { t } = useTranslation();
  const { mapStore, uiStore } = useStore();
  // const [activeKey] = useState(uiStore.);
  // defaultActiveKey={uiStore.currentTab}
  return (
    <Tabs
      mountOnEnter
      activeKey={uiStore.currentTab}
      id="main-tabs"
      onSelect={(tabActiveKey: any) => {
        if (tabActiveKey === 'map') {
          // map is renderd only when tab is shown to prevent leaflet bug
          mapStore.isReadyToRenderMap = true;
        } else mapStore.isReadyToRenderMap = false;
        uiStore.setCurrentTab(tabActiveKey);
      }}
    >
      <Tab style={style} eventKey="charts" title={t('Charts')}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <GroupByGraphsPanel />
          </Suspense>
        </ErrorBoundary>
      </Tab>
      <Tab style={style} eventKey="groups" title={t('Groups')}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <GroupByTablesPanel />
          </Suspense>
        </ErrorBoundary>
      </Tab>
      <Tab style={style} eventKey="map" title={t('Map')}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <MapAccidents />
          </Suspense>
        </ErrorBoundary>
      </Tab>
      <Tab style={style} eventKey="table" title={t('Table')}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <div className="col-auto"><AccidentsTable /></div>
          </Suspense>
        </ErrorBoundary>
      </Tab>
      <Tab style={style} eventKey="image" title={t('Images')}>
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
