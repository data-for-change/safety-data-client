import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import {FilterRequest} from './FilterRequest';


export function FilterPanel() {
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
                   <FilterRequest />
                </div>
            </Collapse>
        </>
    );
}

