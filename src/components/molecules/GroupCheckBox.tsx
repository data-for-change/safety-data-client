
import React,{ ChangeEvent} from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';
import {Checkbox} from '../atoms/Checkbox';
import {IFilterChecker} from '../../stores/FilterChecker'
//import { useStore } from '../../stores/storeConfig'

interface IProps {
    formName:string,
    groupName: string,
    dataArr: Array<IFilterChecker>,
    onChange:(aType: number, val: boolean) => void
  }

export const GroupCheckbox: React.FC<IProps> =  observer(({formName,groupName,dataArr,onChange}) => {
    const { t } = useTranslation();
    //const store = useStore();
    return (
        <Form.Group controlId={formName+".Control"+groupName} >
        <Form.Label className="filterLable">{t(groupName)}:</Form.Label>
        {dataArr.map((fChecker, index) => (
				<Checkbox label={fChecker.label} group={groupName} id={index} checked={fChecker.checked} onChange={(e: ChangeEvent<HTMLInputElement>) => { onChange(index, e.target.checked); }}/>
			))}
      </Form.Group>
    )
})