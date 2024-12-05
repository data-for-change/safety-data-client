import React, { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Accordion, useAccordionButton, Card } from 'react-bootstrap';
// @ts-ignore
// import CitySelector from '../molecules/CitySelector';
// import StreetSelector from '../molecules/StreetSelector';
// import RoadNameSelector from '../molecules/RoadNameSelector';
// import RoadSegmentSelector from '../molecules/RoadSegmentSelector';
import GroupCheckbox from '../molecules/GroupCheckBox';
import Select from '../atoms/Select';
import { useStore } from '../../stores/storeConfig';
import { useQuery, useInjTypeByQuery } from '../../hooks/queryHooks';
import MySelect from '../atoms/MySelect';
import '../../styles/accordion.css'

interface IProps {
}
const STYLE_TOGGLE_WARNING = {
   // color: '#dc3545',
   // cursor: 'pointer',
   // paddingRight: '15px',
   // paddingLeft: '15px',
};
const STYLE_TOGGLE_NORMAL = {
   color: '#007bff',
   cursor: 'pointer',
   // paddingRight: '15px',
   // paddingLeft: '15px',
};

const FilterForm: React.FC<IProps> = observer(({ }) => {
   const { filterStore } = useStore();
   const { injurySeverity, updateInjurySeverity, formCardKey } = filterStore;
   // console.log(injurySeverity)
   return (
      <React.Fragment>
         <Form>
            <Accordion defaultActiveKey={formCardKey.toString()}>
               <CardFilterWhen />
               <CardFilterWhatVehicle />
               <CardFilterWhere />
               <CardFilterWho />
               <CardFilterWhat />
               <CardFilterWhatRoad />
            </Accordion>
            <GroupCheckbox
               formName="exampleForm"
               colFilter={injurySeverity}
               onChange={updateInjurySeverity}
            />
         </Form>
      </React.Fragment>
   );
});


function CustomToggle({ children, style, eventKey, onClick }: any) {
   const [hover, setHover] = useState(false);
   const toggleHover = () => setHover(!hover);
   const linkStyle = (hover) ? { textDecoration: 'underline' } : { textDecoration: 'none' };
   const onButtonClick = useAccordionButton(eventKey, () => onClick(eventKey));
   return (
      <div>
         <a style={{ ...style, ...linkStyle }} onClick={onButtonClick}
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
                  <div className="accordion-when-selects">
                     <MySelect
                        label={'FromYear'}
                        value={String(startYear.queryValue)}
                        data={startYear.arrTypes}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => { setStartYear(e.target.value); }}
                     />
                     <MySelect
                        label={'ToYear'}
                        value={String(endYear.queryValue)}
                        data={endYear.arrTypes}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => { setEndYear(e.target.value); }}
                     />
                  </div>
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
      isValidWhere, roadTypes, updateRoadType,
      locationAccuracy, updateLocationAccuracy,
      isMultipleCities,
      cityPopSizeRange, setCityPopSizeRange,
      setFormCardKey,
   } = filterStore;
   const styleToggle = isValidWhere ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;

   return (
      <Card>
         <Card.Header>
            <CustomToggle
               eventKey="2"
               style={styleToggle}
               onClick={setFormCardKey}>
               {t('Where')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse
            eventKey="2"
            className="filterControls">
            <div>
               {/* <CitySelector isMultiple={isMultipleCities} /> */}
               {/* <StreetSelector />
               <RoadNameSelector />
               <RoadSegmentSelector /> */}
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={roadTypes}
                  onChange={updateRoadType}
               />
               <MySelect
                  style={{ display: 'flex-end', alignItems: 'center' }}
                  label={'city_size'}
                  data={cityPopSizeRange.arrTypes}
                  valProp="val"
                  contentProp="text"
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setCityPopSizeRange(event.target.value)}
               />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={locationAccuracy}
                  onChange={updateLocationAccuracy}
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
   const { isValidWho, genderTypes, updateGenderType, } = filterStore;
   const { ageTypes, updateAgeType, populationTypes, updatePopulationType, setFormCardKey } = filterStore;

   // useEffect(() => {
   //    const query = useQuery(location);
   //    const injType = useInjTypeByQuery(query);
   //    if (injType) {
   //       updateInjuerdType(injType, true);
   //    }
   // }, []);

   const styleToggle = isValidWho ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;

   return (
      <Card>
         <Card.Header>
            <CustomToggle
               eventKey="3"
               style={styleToggle}
               onClick={setFormCardKey}>
               {t('Who')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse
            eventKey="3"
            className="filterControls">
            <div>
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
               eventKey="4"
               style={styleToggle}
               onClick={setFormCardKey}>
               {t('What')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse
            eventKey="4"
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
   const { injTypes,
      updateInjuerdType,
      vehicleType,
      updateVehicleType,
      involvedVehicle,
      setInvolvedVehicle,
      isValidWhatVehicle,
      setFormCardKey
   } = filterStore;
   const styleToggle = isValidWhatVehicle ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;

   return (
      <Card>
         <Card.Header>
            <CustomToggle
               eventKey="1"
               style={styleToggle}
               onClick={setFormCardKey}>
               {t('WhatVehicle')}
            </CustomToggle>
         </Card.Header>
         <Accordion.Collapse
            eventKey="1"
            className="filterControls">
            <div>
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={injTypes}
                  onChange={updateInjuerdType}
               />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={vehicleType} onChange={updateVehicleType}
               />
               <GroupCheckbox
                  formName="exampleForm"
                  colFilter={involvedVehicle} onChange={setInvolvedVehicle}
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
      <Card >
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
export default FilterForm;
