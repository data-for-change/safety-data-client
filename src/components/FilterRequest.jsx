import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

export function FilterRequest() {
    return (
        <Form>
        <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
                <Form.Label>Start Year</Form.Label>
                <Form.Control as="select" onChange={(e) => {console.log(e.target.value);}}>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="exampleForm.ControlSelectEndYear">
                <Form.Label>End Year</Form.Label>
                <Form.Control as="select">
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
                <Form.Control type="input" placeholder="חיפה" />
            </Form.Group>
            <Button variant="primary"  onClick={() => {console.log("get accident");}} >
                Do Filter
            </Button>
        </Form>
    );
}

