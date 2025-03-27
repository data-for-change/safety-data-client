import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';
import GroupCheckbox from '../molecules/GroupCheckBox';
import { useStore } from '../../stores/storeConfig';
import CustomToggle from './CustomToggle';
import '../../styles/accordion.css'

const CardFilterSeverty = observer(() => {
    const { t } = useTranslation();
    const { filterStore } = useStore();
    const { isValidSeverity, injurySeverity, updateInjurySeverity, setFormCardKey } = filterStore;
    return (
       <Card>
          <Card.Header>
             <CustomToggle
                eventKey="6"
                isValid={isValidSeverity}
                onClick={setFormCardKey}>
                {t('Severity')}
             </CustomToggle>
          </Card.Header>
          <Accordion.Collapse
             eventKey="6"
             className="filterControls">
             <div>
                <GroupCheckbox
                formName="filterForm"
                colFilter={injurySeverity}
                onChange={updateInjurySeverity}
                />
             </div>
          </Accordion.Collapse>
       </Card>
    );
 });

 export default CardFilterSeverty;