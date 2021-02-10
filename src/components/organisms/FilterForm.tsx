import React, { ChangeEvent, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Card from 'react-bootstrap/Card';
// @ts-ignore
import CitySelector from '../molecules/CitySelector';
import StreetSelector from '../molecules/StreetSelector';
import RoadNameSelector from '../molecules/RoadNameSelector';
import RoadSegmentSelector from '../molecules/RoadSegmentSelector';
import GroupCheckbox from '../molecules/GroupCheckBox';
import Select from '../atoms/Select';
import { useStore } from '../../stores/storeConfig';
import { useQuery, useInjTypeByQuery } from '../../hooks/queryHooks';
import Loader from '../atoms/Loader';

interface IProps {
}
const STYLE_TOGGLE_WARNING = {
   color: '#dc3545',
   cursor: 'pointer',
   paddingRight: '15px',
   paddingLeft: '15px',
};
const STYLE_TOGGLE_NORMAL = {
   color: '#007bff',
   cursor: 'pointer',
   paddingRight: '15px',
   paddingLeft: '15px',
};

const years: string[] = ['2015', '2016', '2017', '2018', '2019'];

const FilterRequest: React.FC<IProps> = observer(({ }) => {
   const { filterStore } = useStore();
   const { injurySeverity, updateInjurySeverity, isLoading, formCardKey } = filterStore;
   return (
      <React.Fragment>
         {isLoading ? <Loader /> :
            <Form>
               <Accordion defaultActiveKey={formCardKey.toString()}>
                  <CardFilterWhen />
                  <CardFilterWhere />
                  <CardFilterWho />
                  <CardFilterWhat />
                  <CardFilterWhatVehicle />
                  <CardFilterWhatRoad />
               </Accordion>
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={injurySeverity}
                  onChange={updateInjurySeverity}
               />
            </Form>}
      </React.Fragment>
   );
});
// {/* <Button
//    variant="primary"
//    disabled={isLoading || !isValidAllFilters}
//    onClick={() => { filterStore.submitFilter(); }}>
//    {isLoading ? t('Loading…') : t('Submit')}
//    {' '}
// </Button> */}

function CustomToggle({ children, style, eventKey, onClick }: any) {
   const [hover, setHover]= useState(false);
   const toggleHover =() => setHover(!hover);
   const linkStyle = (hover)? {textDecoration: 'underline'}:{textDecoration: 'none'};
   const onButtonClick = useAccordionToggle(eventKey, () => onClick(eventKey));
   return (
      <div>
         <a style={{...style, ...linkStyle}} onClick={onButtonClick} 
         onMouseEnter={toggleHover} 
         onMouseLeave={toggleHover}>
            {children}
         </a>
      </div>
   );
}


const CardFilterWhen: React.FC<any> = observer(() => {
   const { t } = useTranslation();
   const { filterStore } = useStore();
   const {
      isValidWhen, startYear, setStartYear, endYear, setEndYear, 
      dayNight, updateDayNight,
      setFormCardKey,
   } = filterStore;
   const styleToggle = isValidWhen ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;

   return (
      <Card>
         <Card.Header>
            <CustomToggle
               eventKey="0"
               style={styleToggle}
               onClick={setFormCardKey}> 
               {t('When')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse eventKey="0" className="filterControls">
            <Card.Body>
               <div>
                  <Form.Row>
                     <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
                        <Form.Label className="filterLable">
                           {' '}
                           {t('FromYear')}:
                        </Form.Label>
                        <Form.Control
                           as="select"
                           defaultValue={startYear}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => { setStartYear(e.target.value); }}>
                           {years.map((year) => <option key={year}>{year}</option>)}
                        </Form.Control>
                     </Form.Group>
                     <Form.Group as={Col} controlId="exampleForm.ControlSelectEndYear">
                        <Form.Label className="filterLable">
                           {' '}
                           {t('ToYear')}:
                     </Form.Label>
                        <Form.Control
                           as="select"
                           defaultValue={endYear}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => { setEndYear(e.target.value); }}>
                           {years.map((year, i) => <option key={year + i} >{year}</option>)}

                        </Form.Control>
                     </Form.Group>
                  </Form.Row>
                  <GroupCheckbox formName="exampleForm" colFilter={dayNight} onChange={updateDayNight} />
               </div>
            </Card.Body>
         </Accordion.Collapse>
      </Card>
   );
});

const CardFilterWhere = observer(() => {
   const { t } = useTranslation();
   const { filterStore } = useStore();
   const {
      isValidWhere, roadTypes, updateRoadType, isMultipleCities, 
      cityPopSizeRange, setCityPopSizeRange, cityPopSizeArr,
      setFormCardKey,
   } = filterStore;
   const styleToggle = isValidWhere ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;
   return (
      <Card>
         <Card.Header>
            <CustomToggle
               eventKey="1"
               style={styleToggle}
               onClick={setFormCardKey}> 
               {t('Where')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse
            eventKey="1"
            className="filterControls">
            <div>
               <CitySelector isMultiple={isMultipleCities} />
               <StreetSelector />
               <RoadNameSelector />
               <RoadSegmentSelector />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={roadTypes}
                  onChange={updateRoadType}
               />
               <Select
                  label= {'city_size'}
                  id={'cityForm.SelectPopSize'}
                  data={cityPopSizeArr}
                  value={cityPopSizeRange}
                  onChange={(val: string) => setCityPopSizeRange(val)}
               />
            </div>
         </Accordion.Collapse>
      </Card>
   );
});
const CardFilterWho = observer(() => {
   const { t } = useTranslation();
   const location = useLocation();
   const { filterStore } = useStore();
   const { isValidWho, injTypes, updateInjuerdType, genderTypes, updateGenderType, } = filterStore;
   const { ageTypes, updateAgeType, populationTypes, updatePopulationType, setFormCardKey } = filterStore;

   useEffect(() => {
      const query = useQuery(location);
      const injType = useInjTypeByQuery(query);
      if (injType) {
         updateInjuerdType(injType, true);
      }
   }, []);

   const styleToggle = isValidWho ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;

   return (
      <Card>
         <Card.Header>
            <CustomToggle
               eventKey="2"
               style={styleToggle}
               onClick={setFormCardKey}> 
               {t('Who')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse
            eventKey="2"
            className="filterControls">
            <div>
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={injTypes}
                  onChange={updateInjuerdType}
               />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={genderTypes}
                  onChange={updateGenderType}
               />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={ageTypes}
                  onChange={updateAgeType}
               />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={populationTypes}
                  onChange={updatePopulationType}
               />
            </div>
         </Accordion.Collapse>
      </Card>
   );
});
const CardFilterWhat = observer(() => {
   const { t } = useTranslation();
   const { filterStore } = useStore();
   const { isValidWhat, accidentType, updateAccidentType, setFormCardKey } = filterStore;
   const styleToggle = isValidWhat ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;

   return (
      <Card>
         <Card.Header>
            <CustomToggle
               eventKey="3"
               style={styleToggle}
               onClick={setFormCardKey}> 
               {t('What')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse
            eventKey="3"
            className="filterControls">
            <div>
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={accidentType} onChange={updateAccidentType}
               />
            </div>
         </Accordion.Collapse>
      </Card>
   );
});

const CardFilterWhatVehicle = observer(() => {
   const { t } = useTranslation();
   const { filterStore } = useStore();
   const { isValidWhatVehicle, vehicleType, updateVehicleType, setFormCardKey } = filterStore;
   const styleToggle = isValidWhatVehicle ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;

   return (
      <Card>
         <Card.Header>
            <CustomToggle
               eventKey="4"
               style={styleToggle}
               onClick={setFormCardKey}> 
               {t('WhatVehicle')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse
            eventKey="4"
            className="filterControls">
            <div>
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={vehicleType} onChange={updateVehicleType}
               />
            </div>
         </Accordion.Collapse>
      </Card>
   );
});

const CardFilterWhatRoad = observer(() => {
   const { t } = useTranslation();
   const { filterStore } = useStore();
   const { isValidWhatRoad } = filterStore;
   const { speedLimit, updateSpeedLimit, roadWidth, updateRoadWidth, } = filterStore;
   const { separator, updateSeparator, oneLane, updateOneLane, setFormCardKey } = filterStore;
   const styleToggle = isValidWhatRoad ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;

   return (
      <Card>
         <Card.Header>
            <CustomToggle
               eventKey="5"
               style={styleToggle}
               onClick={setFormCardKey}> 
               {t('WhatRoad')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse
            eventKey="5"
            className="filterControls">
            <div>
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={speedLimit}
                  onChange={updateSpeedLimit}
               />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={roadWidth}
                  onChange={updateRoadWidth}
               />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={separator}
                  onChange={updateSeparator}
               />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={oneLane}
                  onChange={updateOneLane}
               />
            </div>
         </Accordion.Collapse>
      </Card>
   );
});
export default FilterRequest;
