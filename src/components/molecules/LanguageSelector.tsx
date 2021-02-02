import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';

const LanguageSelector = observer(() => {
   const { uiStore } = useStore();
   const style: any = document.getElementById('style-direction');
   if (style !== null) {
      if (uiStore.language === 'he') {
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
         <select
            className=" form-select form-select-sm"
            onChange={(e) => {
               uiStore.updateLanguage(e.target.value)
            }}>
            <option value="he">Hebrew</option>
            <option value="en">English</option>
         </select>
      </React.Fragment>
   );
});
export default LanguageSelector;