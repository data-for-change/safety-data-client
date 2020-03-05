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
import { GroupCheckbox } from '../molecules/GroupCheckBox';
import { useStore } from '../../stores/storeConfig';

interface IProps {
  activeCardKey: number
}

export const FilterRequest: React.FC<IProps> = observer(({ activeCardKey = 0 }) => {
  const store = useStore();
  const { t } = useTranslation();
  //const {startYear, EndYear, City} = store;
  return (
    <Form>
      <Accordion defaultActiveKey={activeCardKey.toString()}>
        <CardFilterWhen />
        <CardFilterWhere />
        <CardFilterWho />
      </Accordion>
       <GroupCheckbox formName="exampleForm" groupName='Severity' dataArr={store.injurySeverity} onChange={store.updateInjurySeverity} />
      <Button variant="primary"
        disabled={store.isLoading}
        onClick={() => { store.submitFilter(); }} >{store.isLoading ? t('Loading…') : t('Submit')} </Button>
      {/* <Button variant="primary"
        onClick={() => {  store.submitGroupByYears(); }} >group by</Button> */}
    </Form>
  );
})
const CardFilterWhen = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          {t('When')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0" className="filterControls">
        <Card.Body>
          <div>
            <Form.Row>
              <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
                <Form.Label className="filterLable"> {t('FromYear')}:</Form.Label>
                <Form.Control as="select" defaultValue={store.startYear} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.startYear = parseInt(e.target.value); }}>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlSelectEndYear">
                <Form.Label className="filterLable"> {t('ToYear')}:</Form.Label>
                <Form.Control as="select" defaultValue={store.endYear} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.endYear = parseInt(e.target.value); }}>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <GroupCheckbox formName="exampleForm" groupName='DayNight' dataArr={store.dayNight} onChange={store.updateDayNight} />
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
})
const CardFilterWhere = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          {t('Where')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1" className="filterControls">
        <div>
          <CitySelector isMultiple={false}/>
          <GroupCheckbox formName="exampleForm" groupName='RoadType' dataArr={store.roadTypes} onChange={store.updateRoadType} />
        </div>
      </Accordion.Collapse>
    </Card>
  );
})
const CardFilterWho = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="2">
          {t('Who')}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2" className="filterControls">
        <div>
          <GroupCheckbox formName="exampleForm" groupName='Vehicle' dataArr={store.injTypes} onChange={store.updateInjuerdType} />
          <GroupCheckbox formName="exampleForm" groupName='Gender' dataArr={store.genderTypes} onChange={store.updateGenderType} />
          <GroupCheckbox formName="exampleForm" groupName='Age' dataArr={store.ageTypes} onChange={store.updateAgeType} />
          <GroupCheckbox formName="exampleForm" groupName='Population' dataArr={store.populationTypes} onChange={store.updatePopulationType} />
        </div>
      </Accordion.Collapse>
    </Card>
  );
})
