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
                <Form.Control as="select" defaultValue={store.startYear} onChange={(e) => {store.startYear = e.target.value;}}>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectEndYear">
                <Form.Label>End Year</Form.Label>
                <Form.Control as="select" defaultValue={store.endYear} onChange={(e) => {store.endYear = e.target.value;}}>
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
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Where
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
          <Form.Group controlId="exampleForm.ControlCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="input" placeholder="" value={store.city} onChange={(e) => {store.city = e.target.value;}}/>
            </Form.Group>
          </Accordion.Collapse>
        </Card>
      </Accordion> 
      <Button variant="primary"  onClick={() => {store.submitFilter();}} >
                Submit
            </Button>
      </Form> 
    );
})
//export default FilterRequest; 
