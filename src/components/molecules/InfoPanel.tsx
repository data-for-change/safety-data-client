
import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';

interface IProps {
}

const WhereTitle: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const {cities, cityPopSizeRange, cityPopSizeArr, roads, CITY_POP_SIZE_ALL} = filterStore;
  let res = t('Israel');
  if (cities.length > 0) {
     res = (cities.length === 1) ? cities[0] : t('several-cities');
  } else if (cityPopSizeRange !== CITY_POP_SIZE_ALL) {
     const cityPopSizeObj = cityPopSizeArr.find((obj:any) => {return obj.val === cityPopSizeRange});
     if (cityPopSizeObj) 
        res = `${t('city_size')} ${t(cityPopSizeObj.text)}`;
  } else if (roads.length > 0) {
     res = (roads.length === 1) ? `${t('Road')} ${roads[0]}` : t('several-roads');
  } 
  return (
    <span>{res}</span>
  )
});

const InfoPanel: React.FC<IProps> = observer(({ }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { casualtiesNames, dataAllInjuries, isLoading } = filterStore;
  const reactMarkers = toJS(dataAllInjuries);
  const length = reactMarkers.length;
  if (isLoading) return <div> {t('Loading')} </div>
  if (length > 0) {
    return (
      <h5>
        <WhereTitle />{', '}
        {t('Found')}
        {' '}
        {length}
        {' '}
        {t(casualtiesNames)}
        {' '}
      </h5>
    );
  }
  return (
    <h5>{t('NoResultsFound')}</h5>
  );
});
export default InfoPanel;
