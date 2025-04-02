import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';
import GroupCheckbox from './GroupCheckBox';
import { useStore } from '../../stores/storeConfig';
import CustomToggle from './CustomToggle';
import '../../styles/accordion.css'

const CardFilterWhat = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { isValidWhat, accidentType, updateAccidentType, setFormCardKey } = filterStore;
    return (
       <Card>
          <Card.Header>
             <CustomToggle
                eventKey="4"
                isValid={isValidWhat}
                onClick={setFormCardKey}>
                {t('What')}
             </CustomToggle>
          </Card.Header>
          <Accordion.Collapse
             eventKey="4"
             className="filterControls">
             <div>
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={accidentType} onChange={updateAccidentType}
                />
             </div>
          </Accordion.Collapse>
       </Card>
    );
 });

 export default CardFilterWhat;