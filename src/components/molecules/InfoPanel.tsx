
import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';

interface IProps {
}

const WhenTitle: React.FC<{}> = observer(() => {
  const { filterStore } = useStore();
  const { dayNight } = filterStore;
  let res = (dayNight.text !== '') ? `, ${dayNight.text}` : '';
  return (
    <span>{res}</span>
  )
});
const WhereMainTitle: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { cities, cityPopSizeRange, roads } = filterStore;
  let res = t('Israel');
  if (cities.text !== '') {
    res = `${cities.text}`; // maybe use t('several-cities');
  } else if (cityPopSizeRange.text !== '') {
    res = `${t('city_size')} ${cityPopSizeRange.text}`;
  } else if (roads.text !== '') {
    res = `${t(roads.name)} ${roads.text}`;
  }
  return (
    <span>{res}</span>
  )
});
const WhereTitle: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { roadTypes, locationAccuracy } = filterStore;
  let res = '';
  if (roadTypes.text !== '') {
    res += `, ${roadTypes.text}`;
  }
  if (locationAccuracy.text !== '') res += `, ${locationAccuracy.text}`;
  return (
    <span>{res}</span>
  )
});

const WhoTitle: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { genderTypes, ageTypes, populationTypes } = filterStore;
  let res = (genderTypes.text !== '') ? `, ${genderTypes.text}` : '';
  if (populationTypes.text !== '') res += `, ${populationTypes.text}`;
  if (ageTypes.text !== '') res += `, ${t('Age')}: ${ageTypes.text}`;
  return (
    <span>{res}</span>
  )
});

const WhatTitle: React.FC<{}> = observer(() => {
  const { filterStore } = useStore();
  const { accidentType } = filterStore;
  let res = (accidentType.text !== '') ? `, ${accidentType.text}` : '';
  return (
    <span>{res}</span>
  )
});

const WhatVehicleTitle: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { injTypes, vehicleType , involvedVehicle} = filterStore;
  let res = (injTypes.text !== '') ? `, ${injTypes.text}` : '';
  if (vehicleType.text !== '') res += `,  ${t('VehicleType')}: ${vehicleType.text}`;
  if (involvedVehicle.text !== '') res += `, ${t('Vehicles')}: ${involvedVehicle.text}`;
  return (
    <span>{res}</span>
  )
});
const YearsTitle: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { startYear, endYear } = filterStore;
  let res = (startYear.text !== endYear.text) ? `, ${startYear.text} - ${endYear.text}` :  `, ${startYear.text}`;
  return (
    <span>{res}</span>
  )
});
const InjuriesCountTitle: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { injTypes, injuriesCount , casualtiesNames} = filterStore;
  let res = (injuriesCount > 0)? `, ${t('Found')}  ${injuriesCount} ${t(casualtiesNames)}`: `, ${t('NoResultsFound')}`;
  return (
    <span>{res}</span>
  )
});

const InfoPanel: React.FC<IProps> = observer(() => {
  const styles = {
    div: {
      marginTop: '0.8rem',
      marginLeft: '0.8rem',
      marginRight: '0.8rem',
      marginBottom: '0.2rem'
    }
  }
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { isLoadingInjuriesCount } = filterStore;
  if (isLoadingInjuriesCount) return <div style={styles.div}> {t('Loading')} </div>
  return (
    <h5 style={styles.div}>
      <WhereMainTitle /> 
      <WhereTitle />
      <WhatVehicleTitle />
      <WhoTitle />
      <WhenTitle />
      <WhatTitle />
      <YearsTitle />
      <InjuriesCountTitle />
    </h5>
  );
});
export default InfoPanel;
