import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';
import GroupCheckbox from '../molecules/GroupCheckBox';
import { useStore } from '../../stores/storeConfig';
import CustomToggle from './CustomToggle';
import '../../styles/accordion.css'

const CardFilterWhatRoad = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { isValidWhatRoad } = filterStore;
    const { speedLimit, updateSpeedLimit, roadWidth, updateRoadWidth, } = filterStore;
    const { separator, updateSeparator, oneLane, updateOneLane, setFormCardKey } = filterStore;

    return (
       <Card >
          <Card.Header>
             <CustomToggle
                eventKey="5"
                isValid={isValidWhatRoad}
                onClick={setFormCardKey}>
                {t('WhatRoad')}
             </CustomToggle>
          </Card.Header>
          <Accordion.Collapse
             eventKey="5"
             className="filterControls">
             <div>
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={speedLimit}
                   onChange={updateSpeedLimit}
                />
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={roadWidth}
                   onChange={updateRoadWidth}
                />
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={separator}
                   onChange={updateSeparator}
                />
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={oneLane}
                   onChange={updateOneLane}
                />
             </div>
          </Accordion.Collapse>
       </Card>
    );
 });
 export default CardFilterWhatRoad;