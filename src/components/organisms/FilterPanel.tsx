import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import FilterRequest from './FilterRequest';
//import ConfigFilterModal from './ConfigFilterModal';
import ConfigFilter from '../molecules/ConfigFilter';
import gearlogo from '../../assets/gear2.png';

interface IProps {
   activeCardKey?: number
}
const styles = {
   buttonStyle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem'
   },
   iconStyle: {
      height: '21px',
      width: '21px',
      paddingTop: '0px',
      paddingBottom: '1px',
   },
};

const FilterPanel: React.FC<IProps> = ({ activeCardKey = 0 }: IProps) => {
   const [open, setOpen] = useState(true);
   const [showModel, setShowModal] = useState(false);
   const { t } = useTranslation();
   const showFilter = () => {
      setOpen(!open);
   };
   const textHideButton = (open) ? t('HideFilter') : t('ShowFilter');
   return (
      <React.Fragment>
         {/* <div style={styles.buttonStyle}>
            <Button
               className="btn-sm"
               onClick={() => { showFilter(); }}
               aria-controls="example-collapse-text"
               aria-expanded={open}>
               {textHideButton}
            </Button>
            <Button onClick={() => { setShowModal(!showModel); }}>
               <img
                  src={gearlogo}
                  alt="settings"
                  style={styles.iconStyle}
               />
            </Button>
         </div> */}
         {/* <ConfigFilterModal
            size="sm"
            title="Filter Options"
            showModal={showModel}
            setShow={setShowModal}>
            <ConfigFilter />
         </ConfigFilterModal> */}
         <Collapse in={open}>
            <div id="example-collapse-text">
               <FilterRequest />
            </div>
         </Collapse>
      </React.Fragment>
   );
};
export default FilterPanel;
