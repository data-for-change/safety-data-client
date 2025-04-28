import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabsTemplate from './TabsTemplate';
import ConfigFilterModal from '../filter/ConfigFilterModal';
import { ButtonShowFilterModal } from '../common';
import { useMemos } from "../../hooks/myUseMemo";
import WithSidebarTemplate from './WithSidebarTemplate';
import InfoPanel from '../molecules/InfoPanel';
import { RootState, AppDispatch } from '../../stores/store';
import { setCurrentPage, setStoreByQuery, setInitPage } from '../../stores/ui/appUiSlice';
import { useStore } from '../../stores/storeConfig'; 

interface IProps {}

const HomeTemplate: React.FC<IProps> = () => {
   const dispatch = useDispatch<AppDispatch>();
   const showFilterModal = useSelector((state: RootState) => state.appUi.showFilterModal);

   // Keep using MobX stores for filtering and map logic
   const { mapStore, filterStore } = useStore();
   const { setIsMultipleCities, updateCities, submitFilter } = filterStore;

   useEffect(() => {
      dispatch(setCurrentPage('home'));
      setIsMultipleCities(true);
   }, [dispatch, setIsMultipleCities]);

   mapStore.isReadyToRenderMap = false;

   useEffect(() => {
      dispatch(setInitPage(true));
      updateCities([], false);
      dispatch(setStoreByQuery({ defaultTab: "charts" }));
      submitFilter();
      dispatch(setInitPage(false));
   }, [dispatch, submitFilter, updateCities]);

   const memoConfigModal = useMemos([showFilterModal], <ConfigFilterModal />);

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
   );
};

export default HomeTemplate;
