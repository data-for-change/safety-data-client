import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { TabsTemplate } from './TabsTemplate';
// import FilterPanel from '../organisms/FilterPanel';
import { useStore } from '../../stores/storeConfig';
import ConfigFilterModal from '../organisms/ConfigFilterModal';
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
    filterStore.isMultipleCities = false;
    if (cityResult !== '') {
      filterStore.submitFilter();
    }
    return () => setIsUpdateFromUrl(true); // unmount
  }, []);
  // useEffect(() => {
  //   if (cityResult !== '') {
  //     history.push({
  //       pathname: '/city',
  //       search: `?name=${cityResult}&tab=${currentTab}`,
  //     });
  //     filterStore.submitFilter();
  //   }
  // }, [cityResult, currentTab]);
  useEffect(() => {
    setInitPage(true);
    if (cityResult === '' && isUpdateFromUrl) {
      setIsUpdateFromUrl(false);
      setStoreByQuery('map','תל אביב -יפו');
      filterStore.submitFilter();
    }
    setInitPage(false);
  }, []);
  // useEffect(() => {
  //   if (cityResult !== '') {
  //     filterStore.submitFilter();
  //   }
  // }, [cityResult]);

  const memoConfigModal = useMemos([showFilterModal], <ConfigFilterModal />)
  return (
    <WithSidebarTemplate>
      <div className="App">
        <div>
          <InfoPanel />
          <ButtonShowFilterModal />
        </div>
        {showFilterModal && memoConfigModal}
        <TabsTemplate type="city" />
        {/* </div> */}
        {/* </div>
        </div> */}
      </div>
    </WithSidebarTemplate>
  );
});
export default CityTemplate;
