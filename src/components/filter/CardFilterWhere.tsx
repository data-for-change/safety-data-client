import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';
import GroupCheckbox from './GroupCheckBox';
import { useStore } from '../../stores/storeConfig';
import MySelect from '../atoms/MySelect';
import CustomToggle from './CustomToggle';
import CitySelector from './CitySelector';
import StreetSelector from './StreetSelector';
import RoadNameSelector from './RoadNameSelector';
import RoadSegmentSelector from './RoadSegmentSelector';
import '../../styles/accordion.css'

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
   
    return (
       <Card>
          <Card.Header>
             <CustomToggle
                eventKey="2"
                isValid={isValidWhere}
                onClick={setFormCardKey}>
                {t('Where')}
             </CustomToggle>
          </Card.Header>
          <Accordion.Collapse
             eventKey="2"
             className="filterControls">
             <div>
                <CitySelector isMultiple={isMultipleCities} /> 
                <StreetSelector />
                <RoadNameSelector />
                <RoadSegmentSelector />
                <GroupCheckbox
                   formName="filterForm"
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
                   formName="filterForm"
                   colFilter={locationAccuracy}
                   onChange={updateLocationAccuracy}
                />
             </div>
          </Accordion.Collapse>
       </Card>
    );
 });

 export default CardFilterWhere;