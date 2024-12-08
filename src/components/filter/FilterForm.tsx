import React from 'react';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { Accordion } from 'react-bootstrap';
import { useStore } from '../../stores/storeConfig';
import GroupCheckbox from '../molecules/GroupCheckBox';
import CardFilterWhen from './CardFilterWhen';
import CardFilterWhere from './CardFilterWhere';
import CardFilterWho from './CardFilterWho';
import CardFilterWhat from './CardFilterWhat';
import CardFilterWhatVehicle from './CardFilterWhatVehicle';
import CardFilterWhatRoad from './CardFilterWhatRoad';
// import { useQuery, useInjTypeByQuery } from '../../hooks/queryHooks';
import '../../styles/accordion.css'

interface IProps {
}

const FilterForm: React.FC<IProps> = observer(() => {
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
               formName="filterForm"
               colFilter={injurySeverity}
               onChange={updateInjurySeverity}
            />
         </Form>
      </React.Fragment>
   );
});

export default FilterForm;