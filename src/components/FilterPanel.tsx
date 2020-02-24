import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { FilterRequest } from './FilterRequest';


export function FilterPanel() {
    const [open, setOpen] = useState(true);
    const { t } = useTranslation();
    return (
        <>
            <Button onClick={() => { setOpen(!open); }} aria-controls="example-collapse-text" aria-expanded={open}>
             {t('Filter Options')} 
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-text">
                    <FilterRequest />
                </div>
            </Collapse>
        </>
    );
}

