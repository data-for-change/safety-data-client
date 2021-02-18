
import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';

interface IProps {
  length: number,
  name?: string
}
const CasualtiesSumLabel: React.FC<IProps> = observer(({ length, name }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { casualtiesNames, isLoading } = filterStore;
  const nameSpan = name ? `${name}, ` : `${t('Israel')}, `;
  if (isLoading) return <div> {t('Loading')} </div>
  if (length > 0) {
    return (
      <h5>
        {nameSpan}
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
export default CasualtiesSumLabel;
