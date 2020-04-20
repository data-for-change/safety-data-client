
import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';

interface IProps {
    length:number,
    name?: string
  }
const CasualtiesSumLabel: React.FC<IProps> = observer(({ length, name }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { casualtiesNames } = filterStore;
  const nameSpan = name ? `${name}- ` : '';
  if (length > 0) {
    return (
      <h4>
        {nameSpan}
        {t('Found')}
        {' '}
        {length}
        {' '}
        {t(casualtiesNames)}
        {' '}
      </h4>
    );
  }
  return (
    <h4>{t('NoResultsFound')}</h4>
  );
});
export default CasualtiesSumLabel;
