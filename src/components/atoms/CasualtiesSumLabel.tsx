
import React from 'react'
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx'
import { observer } from "mobx-react"
import { useStore } from '../../stores/storeConfig'

interface IProps {
    length:number
  }

export const CasualtiesSumLabel: React.FC<IProps> = observer(({length}) => {
    const store = useStore();
    const { t } = useTranslation();
   
    if (length > 0) {
        return (
            <h4>{t('Found')} {length} {t('Casualties')} </h4>
        )
    }
    else return (
        <h4>{t('NoResultsFound')}</h4>
    )
})
