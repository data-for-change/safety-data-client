import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import FilterRequest from './FilterRequest';
import ConfigFilterModal from './ConfigFilterModal';

interface IProps {
  activeCardKey?: number
}
const styles = {
  buttonStyle : {
    display: 'flex',
    justifyContent: 'space-between',
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
          {t('Filter Options')}
        </Button>
      </div>
      <ConfigFilterModal showModal={showModel} setShow={setShowModal} />
      <Collapse in={open}>
        <div id="example-collapse-text">
          <FilterRequest activeCardKey={activeCardKey} />
        </div>
      </Collapse>
    </>
  );
};
export default FilterPanel;
