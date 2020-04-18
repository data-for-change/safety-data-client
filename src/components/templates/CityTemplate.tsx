import React from 'react';
import { useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { TabsTemplate } from './TabsTemplate';
import FilterPanel from '../organisms/FilterPanel';
import { useStore } from '../../stores/storeConfig';
import citisNamesHeb from '../../assets/cities_names_heb.json';

// get city name by query by url
function useCityNamefromQuery() {
  const query = useQuery();
  let res = ['תל אביב -יפו'];
  const name = query.get('name');
  let found = false;
  if (name !== null) found = citisNamesHeb.includes(name);
  if (found) {
    res = [citisNamesHeb.find((element) => element === name!)!];
  }
  return res;
}
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface IProps { }
const CityTemplate: React.FC<IProps> = observer(() => {
  // const { t } = useTranslation();
  const { filterStore } = useStore();
  filterStore.isMultipleCities = false;
  let { cityResult } = filterStore;
  if (cityResult === '') {
    const cityName = useCityNamefromQuery();
    filterStore.updateCities(cityName);
    cityResult = cityName[0];
    filterStore.submitFilter();
  }
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row ">
          <div className="p-2 col-md-2"><FilterPanel activeCardKey={1} /></div>
          <main className="col-md-10">
            <CityLable />
            <TabsTemplate defaultKey="map" />
          </main>
        </div>
      </div>
    </div>
  );
});
export default CityTemplate;

export const CityLable: React.FC<{}> = observer(() => {
  const { filterStore } = useStore();
  const { cityResult } = filterStore;
  return (
    <h4>{cityResult}</h4>
  );
});