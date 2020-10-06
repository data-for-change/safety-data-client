import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { TabsTemplate } from './TabsTemplate';
import FilterPanel from '../organisms/FilterPanel';
import { useStore } from '../../stores/storeConfig';
import citisNamesHeb from '../../assets/cities_names_heb.json';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery(location: any) {
  return new URLSearchParams(location.search);
}
// get city name by url query parmas
function useCityNameFromQuery(query: URLSearchParams) {
  let res = ['תל אביב -יפו'];
  const name = query.get('name');
  let found = false;
  if (name !== null) found = citisNamesHeb.includes(name);
  if (found) {
    res = [citisNamesHeb.find((element) => element === name!)!];
  }
  return res;
}
// get city name by url query parmas
function useTabFromQuery(query: URLSearchParams, defVal: string) {
  let res = defVal;
  const name = query.get('tab');
  if (name !== null) {
    res = name;
  }
  return res;
}

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
  const { currentTab, setCurrentTab, setCurrentPage } = uiStore;
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
      const cityName = useCityNameFromQuery(query);
      const tab = useTabFromQuery(query, 'map');
      filterStore.updateCities(cityName, true);
      setCurrentTab(tab);
      // cityResult = cityName[0];
      filterStore.submitFilter();
    }
  }, []);
  useEffect(() => {
    if (cityResult !== '') {
      filterStore.submitFilter();
    }
  }, [cityResult]);
  // useEffect(() => {
  //   if (cityResult !== '') {
  //     history.push({
  //       pathname: '/city',
  //       search: `?name=${cityResult}`,
  //     });
  //   }
  // }, [cityResult]);
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-2 col-md-2"><FilterPanel activeCardKey={1} /></div>
          <main className="col-md-10">
            <CityLable />
            <TabsTemplate type="city" />
          </main>
        </div>
      </div>
    </div>
  );
});
export default CityTemplate;
