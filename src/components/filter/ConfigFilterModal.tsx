import React from 'react';
import { observer } from 'mobx-react';
import { useDispatch, useSelector } from 'react-redux';
import FilterForm from './FilterForm';
import { useStore } from '../../stores/storeConfig';
import ConfigModal from "../organisms/ConfigModal";
import { AppDispatch, RootState } from '../../stores/store';
import { setShowFilterModal } from '../../stores';

interface IProps {
 }
const ConfigFilterModal: React.FC<IProps> = observer(() => {
    const dispatch = useDispatch<AppDispatch>();
    const { filterStore } = useStore();
    const { showFilterModal } = useSelector((state: RootState) => state.appUi);
    const toggleFilterModal = () => {
        dispatch(setShowFilterModal(!showFilterModal));
    };
    return (
        <ConfigModal
            action={() => {
                filterStore.submitFilter();
                setTimeout(() => {
                    toggleFilterModal();
                }, 1000);
            }}
            size="lg"
            title={'Filters'}
            setShow={toggleFilterModal}
            showModal={showFilterModal}>
             <FilterForm />
        </ConfigModal>
    );
});
export default ConfigFilterModal;
