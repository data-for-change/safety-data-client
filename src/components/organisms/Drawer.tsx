import React from 'react'
import { useTranslation } from 'react-i18next';
import FilterForm from './FilterForm'
import { useStore } from '../../stores/storeConfig';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
// import SmallCard2 from '../atoms/SmallCard2';
import '../../styles/sidebar.css'

const Drawer: React.FC<any> = observer((props) => {
   // console.log('Drawer')
   const { t } = useTranslation();
   const { filterStore } = useStore();

   return (
      // <SmallCard2>
      <div className="sidebar">
         <div className="filters">
            <FilterForm />
         </div>
         <Button
            style={{ margin: '0.5rem' }}
            variant="primary"
            onClick={() => filterStore.submitFilter()}
            disabled={filterStore.isLoading || !filterStore.isValidAllFilters}
         >
            {filterStore.isLoading ? t('Loading') : t('Submit')}
         </Button>
      </div>
   )
   {/* </SmallCard2> */ }
})


export default Drawer