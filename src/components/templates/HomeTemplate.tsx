import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import FilterPanel from '../organisms/FilterPanel';
import TabsTemplate from './TabsTemplate';
import { useStore } from '../../stores/storeConfig';

interface IProps { }
const HomeTemplate: React.FC<IProps> = observer(() => {
  const { t } = useTranslation();
  const { mapStore, filterStore } = useStore();
  const {
    setCurrentPage, setIsMultipleCities, updateCities, submitFilter,
  } = filterStore;
  setCurrentPage('home');
  setIsMultipleCities(true);
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
