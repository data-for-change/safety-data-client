import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import FilterPanel from '../organisms/FilterPanel';
import { useQuery, useTabFromQuery } from '../../hooks/queryHooks';
import TabsTemplate from './TabsTemplate';
import { useStore } from '../../stores/storeConfig';

interface IProps { }
const HomeTemplate: React.FC<IProps> = observer(() => {
  const { t } = useTranslation();
  const { mapStore, filterStore, uiStore } = useStore();
  const {
    setIsMultipleCities, updateCities, submitFilter,
  } = filterStore;
  const { currentTab, setCurrentPage, setCurrentTab } = uiStore;
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    history.push({
      pathname: '/home',
      search: `?tab=${currentTab}`,
    });
  }, [currentTab]);
  useEffect(() => {
    setCurrentPage('home');
    const query = useQuery(location);
    const tab = useTabFromQuery(query, 'charts');
    setCurrentTab(tab);
    setIsMultipleCities(true);
  }, []);
  mapStore.isReadyToRenderMap = false;
  useEffect(() => {
    // mapStore.initBounds();
    updateCities([], false);
    submitFilter();
  }, [submitFilter, updateCities]);
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-2 col-md-2"><FilterPanel /></div>
          <main className="col-md-10">
            <h4>{t('Israel')}</h4>
            <TabsTemplate type="home" />
          </main>
        </div>
      </div>
    </div>
  );
});
export default HomeTemplate;
