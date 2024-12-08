import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';
import GroupCheckbox from '../molecules/GroupCheckBox';
import { useStore } from '../../stores/storeConfig';
import CustomToggle from './CustomToggle';
import '../../styles/accordion.css'
 
const CardFilterWho = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { isValidWho, genderTypes, updateGenderType, } = filterStore;
    const { ageTypes, updateAgeType, populationTypes, updatePopulationType, setFormCardKey } = filterStore;
  
    return (
       <Card>
          <Card.Header>
             <CustomToggle
                eventKey="3"
                isValid={isValidWho}
                onClick={setFormCardKey}>
                {t('Who')}
             </CustomToggle>
          </Card.Header>
          <Accordion.Collapse
             eventKey="3"
             className="filterControls">
             <div>
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={genderTypes}
                   onChange={updateGenderType}
                />
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={ageTypes}
                   onChange={updateAgeType}
                />
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={populationTypes}
                   onChange={updatePopulationType}
                />
             </div>
          </Accordion.Collapse>
       </Card>
    );
 });

export default CardFilterWho; 