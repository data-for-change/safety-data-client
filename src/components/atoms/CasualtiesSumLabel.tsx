
import React from 'react'
import { useTranslation } from 'react-i18next';

interface IProps {
    length:number,
    name?: string
  }
export const CasualtiesSumLabel: React.FC<IProps> = ({length,name}) => {
    const { t } = useTranslation();
    const nameSpan = name ? name +"- " : "" 
    if (length > 0) {
        return (
        <h4>{nameSpan}{t('Found')} {length} {t('Casualties')} </h4>
        )
    }
    else return (
        <h4>{t('NoResultsFound')}</h4>
    )
}
