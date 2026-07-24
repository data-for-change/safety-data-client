import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';
import GroupCheckbox from './GroupCheckBox';
import { useStore } from '../../stores/storeConfig';
import { environment } from '../../utils/env.utils';
import { MySelect } from '../common';
import CustomToggle from './CustomToggle';
import CitySelector from './CitySelector';
import StreetSelector from './StreetSelector';
import RoadNameSelector from './RoadNameSelector';
import RoadSegmentSelector from './RoadSegmentSelector';
import '../../styles/accordion.css'

const CardFilterWhere = observer(() => {
    const { t } = useTranslation();
    const { filterStore , userStore} = useStore();
    const hasZonePermission = environment.isLocalMode || (userStore.isAuthenticated && userStore.isHotSpotGrants);
    const {
       isValidWhere, 
       cities,
       roadTypes, updateRoadType, 
       zoneName, setZonesName,
       locationAccuracy, updateLocationAccuracy,
       isMultipleCities,
       cityPopSizeRange, setCityPopSizeRange,
       setFormCardKey,
    } = filterStore;
    const cityName = cities.arrValues[0];
    const showPoliceStation = hasZonePermission && cities.arrValues.length === 1 && (cityName ==='5000');
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
                {showPoliceStation&& <MySelect
                   label={'PoliceStation'}
                   value={String(zoneName.queryValue)}
                   data={zoneName.arrTypes}
                   onChange={(e: ChangeEvent<HTMLSelectElement>) => { setZonesName(e.target.value); }}   
                   cssClass="stacked" 
                   layout="column"               
                />}
                <RoadNameSelector />
                <RoadSegmentSelector />
                <GroupCheckbox
                   formName="filterForm"
                   colFilter={roadTypes}
                   onChange={updateRoadType}
                />
                <MySelect
                   label={'city_size'}
                   data={cityPopSizeRange.arrTypes}
                   valProp="val"
                   contentProp="text"
                   onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setCityPopSizeRange(event.target.value)}
                   cssClass="stacked"
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