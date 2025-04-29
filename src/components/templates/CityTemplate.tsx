import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { observer } from 'mobx-react';
import { TabsTemplate } from './TabsTemplate';
// import FilterPanel from '../organisms/FilterPanel';
import { useStore } from '../../stores/storeConfig';
import ConfigFilterModal from '../filter/ConfigFilterModal';
import { ButtonShowFilterModal } from '../common';
import { useMemos } from '../../hooks/myUseMemo';
import InfoPanel from '../molecules/InfoPanel';
import WithSidebarTemplate from './WithSidebarTemplate';
import { setCurrentPage, setInitPage } from '../../stores/ui/appUiSlice';
import { setStoreByQuery } from '../../stores/ui/appUiThunks';
import { RootState, AppDispatch } from '../../stores/store';

interface IProps { }
const CityTemplate: React.FC<IProps> = observer(() => {
  
  const dispatch = useDispatch<AppDispatch>();
  const showFilterModal = useSelector((state: RootState) => state.appUi.showFilterModal);
  const { filterStore } = useStore();
  const { cityResult, isUpdateFromUrl, setIsUpdateFromUrl } = filterStore;
  
  useEffect(() => {
    setCurrentPage('city');
    filterStore.setIsMultipleCities(false);
    if (cityResult !== '') {
      filterStore.submitFilter();
    }
    return () => setIsUpdateFromUrl(true); // unmount
  }, []);

  useEffect(() => {
    setInitPage(true);
    if (cityResult === '' && isUpdateFromUrl) {
      setIsUpdateFromUrl(false);
      dispatch(setStoreByQuery({ defaultTab: 'map', defaultCity: '5000' }));
      filterStore.submitFilter();
    }
    setInitPage(false);
  }, []);

  const memoConfigModal = useMemos([showFilterModal], <ConfigFilterModal />)
  return (
    <WithSidebarTemplate>
      <div>
        <div>
          <InfoPanel />
          <ButtonShowFilterModal />
        </div>
        {showFilterModal && memoConfigModal}
        <TabsTemplate type="city" />
      </div>
    </WithSidebarTemplate>
  );
});
export default CityTemplate;
