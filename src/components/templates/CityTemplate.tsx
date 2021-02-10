import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { TabsTemplate } from './TabsTemplate';
// import FilterPanel from '../organisms/FilterPanel';
import { useQuery, useTabFromQuery, useCityNameFromQuery } from '../../hooks/queryHooks';
import { useStore } from '../../stores/storeConfig';
import ConfigFilterModal from '../organisms/ConfigFilterModal';
import ButtonShowFilterModal from '../atoms/ButtonShowFilterModal';
import { useMemos } from '../../hooks/myUseMemo';

export const CityLable: React.FC<{}> = observer(() => {
  const { filterStore } = useStore();
  const { cityResult } = filterStore;
  return (
    <h4>{cityResult}</h4>
  );
});

interface IProps { }
const CityTemplate: React.FC<IProps> = observer(() => {
  // const { t } = useTranslation();
  const { filterStore, uiStore } = useStore();
  const { cityResult, isUpdateFromUrl, setIsUpdateFromUrl } = filterStore;
  const { currentTab, setCurrentTab, setCurrentPage, showFilterModal } = uiStore;
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setCurrentPage('city');
    filterStore.isMultipleCities = false;
    if (cityResult !== '') {
      filterStore.submitFilter();
    }
    return () => setIsUpdateFromUrl(true); // unmount
  }, []);
  useEffect(() => {
    if (cityResult !== '') {
      history.push({
        pathname: '/city',
        search: `?name=${cityResult}&tab=${currentTab}`,
      });
      filterStore.submitFilter();
    }
  }, [cityResult, currentTab]);
  useEffect(() => {
    if (cityResult === '' && isUpdateFromUrl) {
      setIsUpdateFromUrl(false);
      const query = useQuery(location);
      const cityName = useCityNameFromQuery(query, 'תל אביב -יפו');
      const tab = useTabFromQuery(query, 'map');
      filterStore.updateCities(cityName, true);
      setCurrentTab(tab);
      // cityResult = cityName[0];
      filterStore.submitFilter();
    }
  }, []);
  // useEffect(() => {
  //   if (cityResult !== '') {
  //     filterStore.submitFilter();
  //   }
  // }, [cityResult]);

  const memoConfigModal = useMemos([showFilterModal], <ConfigFilterModal />)
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          {/* <div className="p-2 col-md-2"><FilterPanel activeCardKey={1} /></div> */}
          <main className="col-md-12">
            <CityLable />
            <ButtonShowFilterModal />
            {showFilterModal && memoConfigModal}
            <TabsTemplate type="city" />
          </main>
        </div>
      </div>
    </div>
  );
});
export default CityTemplate;
