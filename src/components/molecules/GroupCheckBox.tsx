
import React, { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';
import { Checkbox } from '../atoms/Checkbox';
import { IFilterChecker } from '../../stores/FilterChecker'

interface IProps {
  formName: string,
  groupName: string,
  dataArr: Array<IFilterChecker>,
  onChange: (aType: number, val: boolean) => void

}

export const GroupCheckbox: React.FC<IProps> = observer(({ formName, groupName, dataArr, onChange }) => {
  const styleFeedback = {
    marginTop: '.25rem',
    fontSize: '80%',
    color: '#dc3545'
  };
  const { t } = useTranslation();
  const [count, setCount] = useState(dataArr.length);
  const checkValid = (checked: boolean) => {
    if (checked)
      setCount(count + 1)
    else
      setCount(count - 1)
  }
  const onGroupChange = (aType: number, checked: boolean) => {
    checkValid(checked)
    onChange(aType, checked);
  }
  const feedback = <div style={styleFeedback}> {t('check_one_checkbox')}</div>
  const isvalid = (count === 0) ? feedback : null;

  return (
    <Form.Group controlId={formName + ".Control" + groupName} >
      <Form.Label className="filterLable">{t(groupName)}:</Form.Label>
      {dataArr.map((fChecker, index) => (
        <Checkbox key={index} label={fChecker.label} group={groupName} id={index} checked={fChecker.checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { onGroupChange(index, e.target.checked); }} />
      ))}
      {isvalid}
    </Form.Group>
  )
})