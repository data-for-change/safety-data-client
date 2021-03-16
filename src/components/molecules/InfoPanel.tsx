
import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';

interface IProps {
}

const WhenTitle: React.FC<{}> = observer(() => {
  const { filterStore } = useStore();
  const { dayNight } = filterStore;
  let res = (dayNight.text !=='')? `, ${dayNight.text}`:'';
  return (
    <span>{res}</span>
  )
});

const WhereTitle: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { cities, cityPopSizeRange, cityPopSizeArr, roads, CITY_POP_SIZE_ALL } = filterStore;
  let res = t('Israel');
  if (cities.text !== '') {
    res = `${cities.text}` ; // maybe use t('several-cities');
  } else if (cityPopSizeRange !== CITY_POP_SIZE_ALL) {
    const cityPopSizeObj = cityPopSizeArr.find((obj: any) => { return obj.val === cityPopSizeRange });
    if (cityPopSizeObj)
      res = `${t('city_size')} ${t(cityPopSizeObj.text)}`;
  } else if (roads.text !== '') {
    res = `${t(roads.name)} ${roads.text}`; 
    //res = (roads.length === 1) ? `${t('Road')} ${roads[0]}` : t('several-roads');
  }
  return (
    <span>{res}</span>
  )
});

const WhoTitle: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { injTypes, genderTypes, ageTypes } = filterStore;
  let res = (injTypes.text !=='')? `, ${injTypes.text}`:'';
  if (genderTypes.text != '') res += `, ${genderTypes.text}`;
  if (ageTypes.text != '') res += `, ${t('Age')}: ${ageTypes.text}`;
  return (
    <span>{res}</span>
  )
});

const WhatTitle: React.FC<{}> = observer(() => {
  const { filterStore } = useStore();
  const { accidentType } = filterStore;
  let res = (accidentType.text !=='')? `, ${accidentType.text}`:'';
  return (
    <span>{res}</span>
  )
});

const WhatVehicleTitle: React.FC<{}> = observer(() => {
  const { filterStore } = useStore();
  const { vehicleType } = filterStore;
  let res = (vehicleType.text !=='')? `, ${vehicleType.text}`:'';
  return (
    <span>{res}</span>
  )
});

const InfoPanel: React.FC<IProps> = observer(({ }) => {
  const styles = {
    div: {
      marginTop: '1rem',
      marginLeft: '1rem',
      marginRight: '1rem'
    }
  }
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { casualtiesNames, dataAllInjuries, isLoading, injTypes} = filterStore;
  const reactMarkers = toJS(dataAllInjuries);
  const length = reactMarkers.length;
  if (isLoading) return <div style={styles.div}> {t('Loading')} </div>
  if (length > 0) {
    return (
      <h5 style={styles.div}>
        <WhereTitle />
        <WhoTitle />
        <WhenTitle />
        <WhatTitle />
        <WhatVehicleTitle />
        {', '}
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
    <h5 style={styles.div}>{t('NoResultsFound')}</h5>
  );
});
export default InfoPanel;
