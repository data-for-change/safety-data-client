import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card';
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'

export const FilterRequest = observer(() => {
  const store = useStore();
  //const {startYear, EndYear, City} = store;
  return (
    <Form>
      <Accordion defaultActiveKey="0">
        <CardFilterWhen />
        <CardFilterWhere />
        <CardFilterWho/>
      </Accordion>
      <Button variant="primary" onClick={() => { store.submitFilter(); }} >Submit</Button>
    </Form>
  );
})
const CardFilterWhen = observer(() => {
  const store = useStore();
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          When
      </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
              <Form.Label>Start Year</Form.Label>
              <Form.Control as="select" defaultValue={store.startYear} onChange={(e) => { store.startYear = e.target.value; }}>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectEndYear">
              <Form.Label>End Year</Form.Label>
              <Form.Control as="select" defaultValue={store.endYear} onChange={(e) => { store.endYear = e.target.value; }}>
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
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          Where
    </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
        <Form.Group controlId="exampleForm.ControlCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="input" placeholder="" value={store.city} onChange={(e) => { store.city = e.target.value; }} />
        </Form.Group>
      </Accordion.Collapse>
    </Card>
  );
})
const CardFilterWho  = observer(() => {
  const store = useStore();
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="2">
          Who 
    </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2">
        <Form.Group controlId="exampleForm.ControlCity">
          <Form.Label>Type:</Form.Label>
          <Form.Check inline label="all" type={'checkbox'} id={`checkboxinjerd0`} checked={store.injTypes[0].checked}  onClick={(e) => { store.updateInjuerdType(0, e.target.checked); }}/>
          <Form.Check inline label="pedestrian" type={'checkbox'} id={`checkboxinjerd1`} checked={store.injTypes[1].checked}  onClick={(e) => { store.updateInjuerdType(1, e.target.checked); }}/>
          <Form.Check inline label="cyclist" type={'checkbox'} id={`checkboxinjerd2`} checked={store.injTypes[2].checked} onClick={(e) => { store.updateInjuerdType(2, e.target.checked); }}/>
          <Form.Check inline label="motorcycle" type={'checkbox'} id={`checkboxinjerd3`} checked={store.injTypes[3].checked} onClick={(e) => { store.updateInjuerdType(3, e.target.checked); }}/>
          <Form.Check inline label="car" type={'checkbox'} id={`checkboxinjerd4`} checked={store.injTypes[4].checked} onClick={(e) => { store.updateInjuerdType(4, e.target.checked); }} />
          <Form.Check inline label="other" type={'checkbox'} id={`checkboxinjerd5`} checked={store.injTypes[5].checked} onClick={(e) => { store.updateInjuerdType(5, e.target.checked); }}/>
        </Form.Group>
      </Accordion.Collapse>
    </Card>
  );
})
