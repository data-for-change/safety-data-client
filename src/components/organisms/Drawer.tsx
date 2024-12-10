import React from 'react'
import { useTranslation } from 'react-i18next';
import FilterForm from '../filter/FilterForm'
import { useStore } from '../../stores/storeConfig';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import '../../styles/sidebar.css'

const Drawer: React.FC<any> = observer((props) => {
   const { t } = useTranslation();
   const { filterStore } = useStore();
   const {isLoading, isValidAllFilters} = filterStore;
   
   return (
      <div className="sidebar">
         <div className="filters">
            <FilterForm />
         </div>
         <Button
            style={{ margin: '0.5rem' }}
            variant="primary"
            onClick={() => filterStore.submitFilter()}
            disabled={isLoading || !isValidAllFilters}
         >
           {isLoading ? t('Loading') : t('Submit')} 
         </Button>
         <Button
            style={{ margin: '0.5rem' }}
            variant="info"
            onClick={() => alert('action in filter store to collect filters')}
            disabled={isLoading || !isValidAllFilters}
         >
            {t('Save')}  {t('Filter')}
         </Button>
      </div>
   )
  })

export default Drawer