import React from 'react';
// import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';
import IconWithImage from '../atoms/IconWithImage';

interface IProps { }
const ButtonShowFilterModal: React.FC<IProps> = observer(() => {
    // const { t } = useTranslation();
    const { uiStore } = useStore();
    const { showFilterModal, setShowFilterModal } = uiStore;
    const filterIcon = <IconWithImage
        path={'https://static.thenounproject.com/png/40256-200.png'}
        style={{ lineHeight: '30px' }}
    />

    return (
        <>
            <span
                className="btn-sm filter-btn"
                onClick={() => setShowFilterModal(!showFilterModal)}>
                {filterIcon}
            </span>
        </>
    );
});
export default ButtonShowFilterModal;
