
import React,{ ChangeEvent} from 'react'
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

interface IProps {
    label: string,
    group: string,
    id:number,
    checked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => any
  }
export const Checkbox: React.FC<IProps> = ({group,label,id,checked,onChange}) => {
    const { t } = useTranslation();
    return (
        <Form.Check inline label={t(label)} type={'checkbox'} id={`cbox`+group+id} checked={checked} onChange={onChange} />
    )
}