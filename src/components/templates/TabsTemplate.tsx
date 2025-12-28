import React, { FunctionComponent, lazy, Suspense, } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {ErrorBoundary, Loader, SmallCard} from '../common/';
import { useStore } from '../../stores/storeConfig';
import { useDispatch, useSelector, } from 'react-redux';
import { AppDispatch, RootState } from '../../stores/store';
import {setCurrentTab} from '../../stores';

// import MapPage from '../../pages/MapPage';
interface IProps {
  type: string;
}

const GroupByGraphsPanel = lazy(() => import('../chart/GroupByGraphsPanel'));
const GroupByTablesPanel = lazy(() => import('../groupTable/GroupByTablesPanel'));
const MapAccidents = lazy(() => import('../map/AccidentsMap'));
const AccidentsTable = lazy(() => import('../detailsTable/AccidentsTable'));
const MyImageGallery = lazy(() => import('../organisms/MyImageGallery'));
const RiskHotspotModel = lazy(() => import('../organisms/RiskHotspotModel'));

const styles = {
  tab: { marginTop: '0.5rem' },
  tabMap: { marginTop: '0.1rem' },
  mapCard: { width: '150px', height: '35px' }
};

export const TabsTemplate: FunctionComponent<IProps> = observer(({ type }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { mapStore } = useStore();
  const { currentTab } = useSelector((state: RootState) => state.appUi);
  return (
		<Tabs
			mountOnEnter
			activeKey={currentTab}
			id='main-tabs'
			onSelect={(tabActiveKey: any) => {
				if (tabActiveKey === 'map') {
					// map is renderd only when tab is shown to prevent leaflet bug
					mapStore.isReadyToRenderMap = true;
				} else mapStore.isReadyToRenderMap = false;
				dispatch(setCurrentTab(tabActiveKey));
			}}
		>
			<Tab style={styles.tab} eventKey='charts' title={t('Charts')}>
				<ErrorBoundary>
					<Suspense fallback={<Loader />}>
						<GroupByGraphsPanel />
					</Suspense>
				</ErrorBoundary>
			</Tab>
			<Tab style={styles.tab} eventKey='groups' title={t('Groups')}>
				<ErrorBoundary>
					<Suspense fallback={<Loader />}>
						<GroupByTablesPanel />
					</Suspense>
				</ErrorBoundary>
			</Tab>
			<Tab style={styles.tabMap} eventKey='map' title={t('Map')}>
				<ErrorBoundary>
					<Suspense fallback={<Loader />}>
						<SmallCard className='p-1 bg-white rounded shadow'>
							<MapAccidents />
						</SmallCard>
					</Suspense>
				</ErrorBoundary>
			</Tab>
			<Tab style={styles.tab} eventKey='table' title={t('Details')}>
				<ErrorBoundary>
					<Suspense fallback={<Loader />}>
						<div className='col-auto'>
							<AccidentsTable />
						</div>
					</Suspense>
				</ErrorBoundary>
			</Tab>
			<Tab style={styles.tab} eventKey='image' title={t('Images')}>
				<ErrorBoundary>
					<Suspense fallback={<Loader />}>
						<div className='col-auto'>
							<MyImageGallery type={type} />
						</div>
					</Suspense>
				</ErrorBoundary>
			</Tab>
			<Tab style={styles.tab} eventKey='riskModel' title={t('RiskModel')}>
				<ErrorBoundary>
					<Suspense fallback={<Loader />}>
						<div className='col-auto'>
							<RiskHotspotModel />
						</div>
					</Suspense>
				</ErrorBoundary>
			</Tab>
		</Tabs>
  );
});
export default TabsTemplate;
