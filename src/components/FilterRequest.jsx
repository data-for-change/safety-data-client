import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

export function FilterRequest() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                onClick={
                    () => {
                        setOpen(!open);
                    }}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Options
        </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
                            <Form.Label>Start Year</Form.Label>
                            <Form.Control as="select">
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
                </div>
            </Collapse>
        </>
    );
}

