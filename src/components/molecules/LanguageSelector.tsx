import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';
import MySelect from '../atoms/MySelect';

const LanguageSelector = observer(() => {
   const { uiStore } = useStore();
   const {direction} = uiStore;
   const style: any = document.getElementById('style-direction');
      if (style !== null) {
      if (direction === 'rtl') {
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
            value={uiStore.language}
         />        
      </React.Fragment>
   );
});
export default LanguageSelector;