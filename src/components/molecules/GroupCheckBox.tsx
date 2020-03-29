
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';
import { Checkbox } from '../atoms/Checkbox';
import { IColumnFilter } from '../../stores/FilterChecker'

interface IProps {
  formName: string,
  colFilter : IColumnFilter,
  onChange: (aType: number, val: boolean) => void
}

export const GroupCheckbox: React.FC<IProps> = observer(({ formName, colFilter ,onChange}) => {
  const styleFeedback = {
    marginTop: '.25rem',
    fontSize: '80%',
    color: '#dc3545'
  };
  const { t } = useTranslation();
  const {isAllValsFalse, name, arrTypes} = colFilter;
  const onGroupChange = (aType: number, checked: boolean) => {
    //checkValid(checked)
    onChange(aType, checked);
  }
  const feedback = <div style={styleFeedback}> {t('check_one_checkbox')}</div>
  const isvalid = (isAllValsFalse) ? feedback : null;

  return (
    <Form.Group controlId={formName + ".Control" + name} >
      <Form.Label className="filterLable">{t(name)}:</Form.Label>
      {arrTypes.map((fChecker, index) => (
        <Checkbox key={index} label={fChecker.label} group={colFilter.name} id={index} checked={fChecker.checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { onGroupChange(index, e.target.checked); }} />
      ))}
      {isvalid}
    </Form.Group>
  )
})

