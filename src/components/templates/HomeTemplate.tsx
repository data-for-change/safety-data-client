import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
// import FilterPanel from '../organisms/FilterPanel';
import TabsTemplate from './TabsTemplate';
import { useStore } from '../../stores/storeConfig';
import ConfigFilterModal from '../filter/ConfigFilterModal';
import ButtonShowFilterModal from '../atoms/ButtonShowFilterModal';
import { useMemos } from "../../hooks/myUseMemo";
// import CasualtiesSumLabel from '../atoms/CasualtiesSumLabel';
// import FilterForm from "../organisms/FilterForm";
import WithSidebarTemplate from './WithSidebarTemplate';
import InfoPanel from '../molecules/InfoPanel';

interface IProps { }
const HomeTemplate: React.FC<IProps> = observer(() => {
   const { mapStore, filterStore, uiStore } = useStore();
   const { setIsMultipleCities, updateCities, submitFilter } = filterStore;
   const { setCurrentPage, setStoreByQuery, showFilterModal , setInitPage} = uiStore;

   useEffect(() => {
      setCurrentPage('home');
      // const query = useQuery(location);
      // const tab = useTabFromQuery(query, 'charts');
      // setCurrentTab(tab);
      setIsMultipleCities(true);
   }, []);  // eslint-disable-line react-hooks/exhaustive-deps

   mapStore.isReadyToRenderMap = false;

   useEffect(() => {
      // mapStore.initBounds();
      setInitPage(true);
      updateCities([], false);
      setStoreByQuery('charts');
      submitFilter();
      setInitPage(false)
   }, [submitFilter, updateCities]);


   const memoConfigModal = useMemos([showFilterModal], <ConfigFilterModal />)

   return (
      <WithSidebarTemplate>
         <div>
            <div>
               <InfoPanel />
               <ButtonShowFilterModal />
            </div>
            {showFilterModal && memoConfigModal}
            <TabsTemplate type="home" />
         </div>
      </WithSidebarTemplate>
   )
})

export default HomeTemplate
