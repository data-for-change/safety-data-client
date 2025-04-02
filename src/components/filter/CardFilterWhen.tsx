import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';
import GroupCheckbox from './GroupCheckBox';
import { useStore } from '../../stores/storeConfig';
import MySelect from '../atoms/MySelect';
import CustomToggle from './CustomToggle';
import '../../styles/accordion.css'

const CardFilterWhen: React.FC<any> = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const {
       isValidWhen, startYear, setStartYear, endYear, setEndYear,
       dayNight, updateDayNight,
       setFormCardKey,
    } = filterStore;
   
    return (
       <Card>
          <Card.Header>
             <CustomToggle
                eventKey="0"
                isValid={isValidWhen}
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
                   <GroupCheckbox formName="filterForm" colFilter={dayNight} onChange={updateDayNight} />
                </div>
             </Card.Body>
          </Accordion.Collapse>
       </Card>
    );
 });

 export default CardFilterWhen 