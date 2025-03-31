import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { TabsTemplate } from './TabsTemplate';
// import FilterPanel from '../organisms/FilterPanel';
import { useStore } from '../../stores/storeConfig';
import ConfigFilterModal from '../filter/ConfigFilterModal';
import ButtonShowFilterModal from '../atoms/ButtonShowFilterModal';
import { useMemos } from '../../hooks/myUseMemo';
import InfoPanel from '../molecules/InfoPanel';
import WithSidebarTemplate from './WithSidebarTemplate';

interface IProps { }
const CityTemplate: React.FC<IProps> = observer(() => {
  // const { t } = useTranslation();
  const { filterStore, uiStore } = useStore();
  const { cityResult, isUpdateFromUrl, setIsUpdateFromUrl } = filterStore;
  const { setCurrentPage, setStoreByQuery, showFilterModal, setInitPage} = uiStore;

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
      setStoreByQuery('map','5000');
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
