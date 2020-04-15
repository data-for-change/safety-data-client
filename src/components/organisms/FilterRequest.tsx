import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
// @ts-ignore
import { CitySelector } from '../molecules/CitySelector';
import { StreetSelector } from '../molecules/StreetSelector'
import { RoadSegmentSelector } from '../molecules/RoadSegmentSelector'
import { GroupCheckbox } from '../molecules/GroupCheckBox';
import { useStore } from '../../stores/storeConfig';

interface IProps {
  activeCardKey: number
}
const STYLE_TOGGLE_WARNING = {
  color: '#dc3545'
};
const STYLE_TOGGLE_NORMAL = {
  color: '#007bff'
};

export const FilterRequest: React.FC<IProps> = observer(({ activeCardKey = 0 }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { injurySeverity, updateInjurySeverity, isLoading, isValidAllFilters } = filterStore;
  return (
    <Form>
      <Accordion defaultActiveKey={activeCardKey.toString()}>
        <CardFilterWhen />
        <CardFilterWhere />
        <CardFilterWho />
        <CardFilterWhat />
        <CardFilterWhatVehicle />
        <CardFilterWhatRoad />
      </Accordion>
      <GroupCheckbox formName="exampleForm" colFilter={injurySeverity} onChange={updateInjurySeverity} />
      <Button variant="primary"
        disabled={isLoading || !isValidAllFilters}
        onClick={() => { filterStore.submitFilter(); }} >{isLoading ? t('Loading…') : t('Submit')} </Button>
    </Form>
  );
})

const CardFilterWhen = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  let { isValidWhen, startYear, setStartYear, endYear, setEndYear, dayNight, updateDayNight } = filterStore;
  const styleToggle = isValidWhen ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0" style={styleToggle}>
          {t('When')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0" className="filterControls">
        <Card.Body>
          <div>
            <Form.Row>
              <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
                <Form.Label className="filterLable"> {t('FromYear')}:</Form.Label>
                <Form.Control as="select" defaultValue={startYear} onChange={(e: ChangeEvent<HTMLInputElement>) => { setStartYear(e.target.value); }}>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlSelectEndYear">
                <Form.Label className="filterLable"> {t('ToYear')}:</Form.Label>
                <Form.Control as="select" defaultValue={endYear} onChange={(e: ChangeEvent<HTMLInputElement>) => { setEndYear(e.target.value); }}>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <GroupCheckbox formName="exampleForm" colFilter={dayNight} onChange={updateDayNight} />
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
})
const CardFilterWhere = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { isValidWhere, roadTypes, updateRoadType, isMultipleCities } = filterStore;
  const styleToggle = isValidWhere ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1" style={styleToggle}>
          {t('Where')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1" className="filterControls">
        <div>
          <CitySelector isMultiple={isMultipleCities} />
          <StreetSelector />
          <RoadSegmentSelector />
          <GroupCheckbox formName="exampleForm" colFilter={roadTypes} onChange={updateRoadType} />
        </div>
      </Accordion.Collapse>
    </Card>
  );
})
const CardFilterWho = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { isValidWho, injTypes, updateInjuerdType, genderTypes, updateGenderType } = filterStore;
  const { ageTypes, updateAgeType, populationTypes, updatePopulationType } = filterStore;
  const styleToggle = isValidWho ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="2" style={styleToggle} >
          {t('Who')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2" className="filterControls">
        <div>
          <GroupCheckbox formName="exampleForm" colFilter={injTypes} onChange={updateInjuerdType} />
          <GroupCheckbox formName="exampleForm" colFilter={genderTypes} onChange={updateGenderType} />
          <GroupCheckbox formName="exampleForm" colFilter={ageTypes} onChange={updateAgeType} />
          <GroupCheckbox formName="exampleForm" colFilter={populationTypes} onChange={updatePopulationType} />
        </div>
      </Accordion.Collapse>
    </Card>
  );
})
const CardFilterWhat = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { isValidWhat, accidentType, updateAccidentType } = filterStore;
  const styleToggle = isValidWhat ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="3" style={styleToggle}>
          {t('What')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="3" className="filterControls">
        <div>
          <GroupCheckbox formName="exampleForm" colFilter={accidentType} onChange={updateAccidentType} />
        </div>
      </Accordion.Collapse>
    </Card>
  );
})

const CardFilterWhatVehicle = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { isValidWhatVehicle, vehicleType, updateVehicleType } = filterStore;
  const styleToggle = isValidWhatVehicle ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="4" style={styleToggle}>
          {t('WhatVehicle')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="4" className="filterControls">
        <div>
          <GroupCheckbox formName="exampleForm" colFilter={vehicleType} onChange={updateVehicleType} />
        </div>
      </Accordion.Collapse>
    </Card>
  );
})

const CardFilterWhatRoad = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { isValidWhatRoad } = filterStore;
  const { speedLimit, updateSpeedLimit, roadWidth, updateRoadWidth } = filterStore;
  const { separator, updateSeparator, oneLane, updateOneLane } = filterStore;
  const styleToggle = isValidWhatRoad ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="5" style={styleToggle}>
          {t('WhatRoad')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="5" className="filterControls">
        <div>
          <GroupCheckbox formName="exampleForm" colFilter={speedLimit} onChange={updateSpeedLimit} />
          <GroupCheckbox formName="exampleForm" colFilter={roadWidth} onChange={updateRoadWidth} />
          <GroupCheckbox formName="exampleForm" colFilter={separator} onChange={updateSeparator} />
          <GroupCheckbox formName="exampleForm" colFilter={oneLane} onChange={updateOneLane} />
        </div>
      </Accordion.Collapse>
    </Card>
  );
})