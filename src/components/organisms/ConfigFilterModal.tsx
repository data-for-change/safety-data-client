import React from 'react';
import { observer } from 'mobx-react';
import FilterPanel from '../organisms/FilterPanel';
import { useStore } from '../../stores/storeConfig';
import ConfigModal from "../organisms/ConfigModal";

interface IProps { }
const ConfigFilterModal: React.FC<IProps> = observer(() => {
    const { filterStore, uiStore } = useStore();
    const { showFilterModal, setShowFilterModal } = uiStore;
    return (
        <ConfigModal
            action={() => {
                filterStore.submitFilter();
                setTimeout(() => {
                    setShowFilterModal(!showFilterModal)
                }, 1000);
            }}
            size="lg"
            title={'Filters'}
            setShow={setShowFilterModal}
            showModal={showFilterModal}>
            <FilterPanel />
        </ConfigModal>
    );
});
export default ConfigFilterModal;