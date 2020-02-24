import React , {MouseEvent} from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'

export const LanguageSelector = observer(() => {
  const store = useStore();
  const style:any = document.getElementById('style-direction')
  if (style !== null)
  {
      if(store.language === 'he') {
        style.href = './bootstrap.rtl.min.css';
        document.body.classList.remove('dir-ltr');
        document.body.classList.add('dir-rtl');
    } else {
        style.href = './bootstrap.min.css';
        document.body.classList.remove('dir-rtl');
        document.body.classList.add('dir-ltr');
    }
  }
  return (
    <ButtonGroup toggle size="sm" className="languageSelector">
    <ToggleButton type="radio" name="radiolang"  value="he" defaultChecked onClick={(e:MouseEvent) => { store.updateLanguage('he'); }}>
      heb
    </ToggleButton>
    <ToggleButton type="radio" name="radiolang" value="en" onClick={(e:MouseEvent) => { store.updateLanguage('en'); }}>
      Eng
    </ToggleButton>
  </ButtonGroup>
  );
})

    // <Form>
    //    <Form.Group controlId="exampleForm.ControlSelectLang" >
    //         <Form.Label className="filterLable">Lang:</Form.Label>
    //         <Form.Check inline label="heb" type={'radio'} id={`radiolangheb`} checked={store.language === 'he'} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateLanguage('he'); }} />
    //         <Form.Check inline label="eng" type={'radio'} id={`radiolangeng`} checked={store.language === 'en'} onChange={(e:ChangeEvent<HTMLInputElement>) => { store.updateLanguage('en'); }} />
    //       </Form.Group>
    // </Form>


