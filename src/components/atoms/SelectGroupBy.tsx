import React, { ChangeEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig'


interface IProps { id:string }

export const SelectGroupBy: React.FC<IProps> = observer(({id}) => {
    const { t } = useTranslation();
    const store = useStore();
    const {groupByDict, groupBy, updateGroupby} = store;
    const onSelectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        updateGroupby(event.target.value)
      }, [updateGroupby]);
      
    return (
        <Form className="form-inline">
            <Form.Group controlId={`GrupForm.${id}.SelectGroupBy`}>
                <Form.Label className="filterLable"> {t('GroupBy')}:</Form.Label>
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
