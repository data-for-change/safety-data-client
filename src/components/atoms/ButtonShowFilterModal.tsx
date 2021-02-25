import React from 'react';
// import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';
// import IconWithImage from '../atoms/IconWithImage';
// import imgSrc from '../../assets/filter.png';
import { useMemos } from '../../hooks/myUseMemo';
import SvgIconFilter from '../../assets/SvgIconFilter';
import '../../styles/filter-btn.css'

interface IProps { }
const ButtonShowFilterModal: React.FC<IProps> = observer(() => {
    // const { t } = useTranslation();
    const { uiStore } = useStore();
    const { showFilterModal, setShowFilterModal } = uiStore;
    const memoFilterIcon = useMemos([],
        <SvgIconFilter color={'var(--onprimary-color)'} height={40} width={34} />);
    // const filterIcon = <IconWithImage
    //     path={imgSrc}
    //     style={{ lineHeight: '30px' }}
    //     alt='open filter'
    // />

    return (
        <>
            <span
                title="Filter"
                // aria-label="This is information"
                className="btn-sm filter-btn"
                onClick={() => setShowFilterModal(!showFilterModal)}>
                {memoFilterIcon}
            </span>
        </>
    );
});
export default ButtonShowFilterModal;
