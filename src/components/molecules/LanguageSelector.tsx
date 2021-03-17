import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';
import Form from 'react-bootstrap/Form'
import MySelect from '../atoms/MySelect';

const LanguageSelector = observer(() => {
   const { uiStore } = useStore();
   const style: any = document.getElementById('style-direction');
   if (style !== null) {
      if (uiStore.direction === 'rtl') {
         style.href = './bootstrap.rtl.min.css';
         // changeLanguage('he')
         document.body.classList.remove('dir-ltr');
         document.body.classList.add('dir-rtl');
      } else {
         style.href = './bootstrap.min.css';
         // changeLanguage('en')
         document.body.classList.remove('dir-rtl');
         document.body.classList.add('dir-ltr');
      }
   }
   return (
      <React.Fragment>

         <MySelect
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
               uiStore.updateLanguage(e.target.value)
            }}
            //  label={labelText}
            data={[{ value: 'he', text: 'Hebrew' }, { value: 'en', text: 'English' }]}
            valProp="value"
            contentProp="text"
            value={'he'}
         />
         {/* <Form className="form-inline">
            <Form.Group>
               <Form.Control
                  style={{ width: '7rem' }}
                  className="form-select form-select-sm"
                  as="select"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     uiStore.updateLanguage(e.target.value)
                  }}
               >
                  <option value="he">Hebrew</option>
                  <option value="en">English</option>
               </Form.Control>
            </Form.Group>
         </Form> */}
         {/* <select
            className="form-select-sm"
            onChange={(e) => {
               uiStore.updateLanguage(e.target.value)
            }}>
            <option value="he">Hebrew</option>
            <option value="en">English</option>
         </select> */}
      </React.Fragment>
   );
});
export default LanguageSelector;