import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';
import GroupCheckbox from '../molecules/GroupCheckBox';
import { useStore } from '../../stores/storeConfig';
import CustomToggle from './CustomToggle';
import '../../styles/accordion.css'

const CardFilterWhatVehicle = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { injTypes,
       updateInjuerdType,
       vehicleType,
       updateVehicleType,
       involvedVehicle,
       setInvolvedVehicle,
       isValidWhatVehicle,
       setFormCardKey
    } = filterStore;
    
    return (
       <Card>
          <Card.Header>
             <CustomToggle
                eventKey="1"
                isValid={isValidWhatVehicle}
                onClick={setFormCardKey}>
                {t('WhatVehicle')}
             </CustomToggle>
          </Card.Header>
          <Accordion.Collapse
             eventKey="1"
             className="filterControls">
             <div>
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={injTypes}
                   onChange={updateInjuerdType}
                />
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={vehicleType} onChange={updateVehicleType}
                />
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={involvedVehicle} onChange={setInvolvedVehicle}
                />
             </div>
          </Accordion.Collapse>
       </Card>
    );
 });
 export default CardFilterWhatVehicle;