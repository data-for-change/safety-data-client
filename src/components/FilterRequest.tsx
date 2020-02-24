import React , {ChangeEvent} from 'react'
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'

export const FilterRequest = observer(() => {
  const store = useStore();
  const { t } = useTranslation();
  //const {startYear, EndYear, City} = store;
  return (
    <Form>
      <Accordion defaultActiveKey="0">
        <CardFilterWhen />
        <CardFilterWhere />
        <CardFilterWho />
      </Accordion>
      <Button variant="primary" onClick={() => { store.submitFilter(); }} > {t('Submit')} </Button>
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
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
              <Form.Label className="filterLable"> {t('FromYear')}</Form.Label>
              <Form.Control as="select" defaultValue={store.startYear} onChange={(e: ChangeEvent<HTMLInputElement>) => { store.startYear = parseInt(e.target.value); }}>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectEndYear">
              <Form.Label className="filterLable"> {t('ToYear')}</Form.Label>
              <Form.Control as="select" defaultValue={store.endYear} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.endYear = parseInt(e.target.value); }}>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
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
          <Form.Group controlId="exampleForm.ControlRoadeType" >
            <Form.Label className="filterLable">Road Type:</Form.Label>
            <Form.Check inline label="urban junction" type={'checkbox'} id={`checkboxroadt0`} checked={store.roadTypes[0].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateRoadType(0, e.target.checked); }} />
            <Form.Check inline label="urban road" type={'checkbox'} id={`checkboxroadt1`} checked={store.roadTypes[1].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateRoadType(1, e.target.checked); }} />
            <Form.Check inline label="non-urban junction" type={'checkbox'} id={`checkboxroadt2`} checked={store.roadTypes[2].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateRoadType(2, e.target.checked); }} />
            <Form.Check inline label="non-urban road" type={'checkbox'} id={`checkboxroadt3`} checked={store.roadTypes[3].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateRoadType(3, e.target.checked); }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlCity">
            <Form.Label className="filterLable">City:</Form.Label>
            <Form.Control type="input" placeholder="" value={store.city} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.city = e.target.value; }} />
          </Form.Group>
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
          <Form.Group controlId="exampleForm.ControlInjType">
            <Form.Label className="filterLable">{t('Vehicle')}</Form.Label>
            <Form.Check inline label={t('all')} type={'checkbox'} id={`checkboxinjerd0`} checked={store.injTypes[0].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(0, e.target.checked); }} />
            <Form.Check inline label={t('pedestrian')} type={'checkbox'} id={`checkboxinjerd1`} checked={store.injTypes[1].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(1, e.target.checked); }} />
            <Form.Check inline label={t('cyclist')} type={'checkbox'} id={`checkboxinjerd2`} checked={store.injTypes[2].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(2, e.target.checked); }} />
            <Form.Check inline label={t('motorcycle')} type={'checkbox'} id={`checkboxinjerd3`} checked={store.injTypes[3].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(3, e.target.checked); }} />
            <Form.Check inline label={t('car')} type={'checkbox'} id={`checkboxinjerd4`} checked={store.injTypes[4].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(4, e.target.checked); }} />
            <Form.Check inline label={t('other')} type={'checkbox'} id={`checkboxinjerd5`} checked={store.injTypes[5].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateInjuerdType(5, e.target.checked); }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlGenderType">
          <Form.Label className="filterLable">{t('Gender')}</Form.Label>
            <Form.Check inline label= {t('female')} type={'checkbox'} id={`checkboxgendert0`} checked={store.genderTypes[0].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateGenderType(0, e.target.checked); }} />
            <Form.Check inline label={t('male')}  type={'checkbox'} id={`checkboxgendert1`} checked={store.genderTypes[1].checked} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateGenderType(1, e.target.checked); }} />
          </Form.Group>
        </div>
      </Accordion.Collapse>
    </Card>
  );
})
