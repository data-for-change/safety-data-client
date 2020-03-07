import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig'


interface IProps { }

export const SelectGroupBy: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const store = useStore();
    return (
        <Form className="form-inline">
            <Form.Group controlId="GrupForm.ControlSelectGroupBy">
                <Form.Label className="filterLable"> {t('GroupBy')}:</Form.Label>
                <Form.Control as="select" defaultValue={store.groupBy.text} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { store.updateGroupby(e.target.value); store.submitfilterdGroup(store.groupBy)}}>
                    { Object.entries(store.groupByDict).map(([key,x]:any[])=>{
                        console.log(x)
                         return (<option value={x.text}>{t(x.text)}</option>)
                    })}
                </Form.Control>
            </Form.Group>
        </Form>
    )

})
