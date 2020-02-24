import React , {ChangeEvent} from 'react'
import Form from 'react-bootstrap/Form';
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'

export const LanguageSelector = observer(() => {
  const store = useStore();
  //const {startYear, EndYear, City} = store;
  return (
    <Form>
       <Form.Group controlId="exampleForm.ControlSelectLang" >
            <Form.Label className="filterLable">Lang:</Form.Label>
            <Form.Check inline label="heb" type={'radio'} id={`radiolangheb`} checked={store.language === 'he'} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateLanguage('he'); }} />
            <Form.Check inline label="eng" type={'radio'} id={`radiolangeng`} checked={store.language === 'en'} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateLanguage('en'); }} />
          </Form.Group>
    </Form>
  );
})

