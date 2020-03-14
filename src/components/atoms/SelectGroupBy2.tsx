import React, { ChangeEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig'


interface IProps { }

export const SelectGroupBy2: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const store = useStore();
    const {group2Dict, groupBy2, updateGroupBy2} = store;
    const onSelectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        updateGroupBy2(event.target.value)
      }, [updateGroupBy2]);  
    return (
        <Form className="form-inline">
            <Form.Group controlId={`GrupForm.SelectGroupBy`}>
                {/* <Form.Label className="filterLable"> {t('GroupBy')}:</Form.Label> */}
                <Form.Control as="select" defaultValue={groupBy2.text} 
                    onChange={onSelectChange}
                    >
                    { Object.entries(group2Dict).map(([key,x]:any[])=>{
                         return (<option value={x.text} key={key}>{t(x.text)}</option>)
                    })}
                </Form.Control>
            </Form.Group>
        </Form>
    )

})
