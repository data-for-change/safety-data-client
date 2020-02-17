import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'

export const FilterRequest = observer(() => {
    const store = useStore();
    //const {startYear, EndYear, City} = store;
    return (
      <Form>
        <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
                <Form.Label>Start Year</Form.Label>
                <Form.Control as="select" onChange={(e) => {store.startYear = e.target.value;}}>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectEndYear">
                <Form.Label>End Year</Form.Label>
                <Form.Control as="select" onChange={(e) => {store.EndYear = e.target.value;}}>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                </Form.Control>
            </Form.Group>
        </Form.Row>
            <Form.Group controlId="exampleForm.ControlCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="input" placeholder="חיפה" onChange={(e) => {store.City = e.target.value;}}/>
            </Form.Group>
            <Button variant="primary"  onClick={() => {store.submitFilter();}} >
                Do Filter
            </Button>
        </Form> 
    );
})
//export default FilterRequest; 
