import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import FilterRequest from './FilterRequest';
import ConfigFilterModal from './ConfigFilterModal';
import ConfigFilter from '../molecules/ConfigFilter';
import gearlogo from '../../assets/gear2.png';

interface IProps {
  activeCardKey?: number
}
const styles = {
  buttonStyle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconStyle: {
    height: '21px',
    width: '21px',
    paddingTop: '0px',
    paddingBottom: '1px',
  },
};

const FilterPanel: React.FC<IProps> = ({ activeCardKey = 0 }) => {
  const [open, setOpen] = useState(true);
  const [showModel, setShowModal] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div style={styles.buttonStyle}>
        <Button onClick={() => { setOpen(!open); }} aria-controls="example-collapse-text" aria-expanded={open}>
          {t('Hide')}
        </Button>
        <Button onClick={() => { setShowModal(!showModel); }}>
          <img src={gearlogo} alt="settings" style={styles.iconStyle} />
        </Button>
      </div>
      <ConfigFilterModal title="Filter Options" showModal={showModel} setShow={setShowModal}>
        <ConfigFilter />
      </ConfigFilterModal>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <FilterRequest activeCardKey={activeCardKey} />
        </div>
      </Collapse>
    </>
  );
};
export default FilterPanel;
