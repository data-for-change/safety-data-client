
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next';

import Form from 'react-bootstrap/Form';

interface IProps {
    label: string,
    id: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => any
}
export const RangeSlider: React.FC<IProps> = ({ label, id, onChange }) => {
    const style = {
        paddingLeft: "10px",
        paddingRight: "10px",
    };
    const { t } = useTranslation();
    return (
        <div >
            <Form className="form-inline" >
                <Form.Group controlId={"Range."+id}>
                <Form.Label style={style}>{t(label)}: </Form.Label>
                <Form.Control type="range" onChange={onChange}/>
                </Form.Group>
            </Form>
        </div>
    )

}