import React, { ChangeEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig'


interface IProps { 
    id:string ,
    labelText?:string,
}

export const SelectGroupBy: React.FC<IProps> = observer(({id, labelText='GroupBy'}) => {
    const { t } = useTranslation();
    const store = useStore();
    const {groupByDict, groupBy, updateGroupby} = store;
    const lable= (labelText !== '')? <Form.Label className="filterLable"> {t(labelText)}:</Form.Label>:null;
    const onSelectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        updateGroupby(event.target.value)
      }, [updateGroupby]);
      
    return (
        <Form className="form-inline">
            <Form.Group controlId={`GrupForm.${id}.SelectGroupBy`}>
                {lable}
                <Form.Control as="select" value={groupBy.text}
                    onChange={onSelectChange}
                    >
                    { Object.entries(groupByDict).map(([key,x]:any[])=>{
                         return (<option value={x.text} key={key}>{t(x.text)}</option>)
                    })}
                </Form.Control>
            </Form.Group>
        </Form>
    )

})
