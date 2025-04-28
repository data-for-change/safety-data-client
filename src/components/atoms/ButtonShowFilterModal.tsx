import React from 'react';
// import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useMemos } from '../../hooks/myUseMemo';
import { AppDispatch, RootState } from '../../stores/store';
import { setShowFilterModal } from '../../stores';
import SvgIconFilter from '../../assets/SvgIconFilter';
import '../../styles/filter-btn.css'

interface IProps { }
const ButtonShowFilterModal: React.FC<IProps> = () => {
    // const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const { showFilterModal } = useSelector((state: RootState) => state.appUi);
    const memoFilterIcon = useMemos([],
        <SvgIconFilter color={'var(--onprimary-color)'} height={36} width={36} />);
    return (
        <>
            <span
                title="Filter"
                // aria-label="This is information"
                className="btn-sm filter-btn"
                onClick={() => dispatch(setShowFilterModal(!showFilterModal))}>
                {memoFilterIcon}
            </span>
        </>
    );
};
export default ButtonShowFilterModal;
