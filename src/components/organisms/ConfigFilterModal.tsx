import React from 'react';
import { observer } from 'mobx-react';
import FilterRequest from '../organisms/FilterRequest';
import { useStore } from '../../stores/storeConfig';
import ConfigModal from "../organisms/ConfigModal";

interface IProps {
    activeCardKey?: number
 }
const ConfigFilterModal: React.FC<IProps> = observer(({activeCardKey = 0}) => {
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
             <FilterRequest activeCardKey={activeCardKey} />
        </ConfigModal>
    );
});
export default ConfigFilterModal;