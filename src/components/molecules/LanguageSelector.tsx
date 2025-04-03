import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../stores/store';
import { updateLanguage, setDirection } from '../../stores';
import MySelect from '../atoms/MySelect';

const LanguageSelector = () => {
   const dispatch = useDispatch<AppDispatch>();  
   const { language, direction } = useSelector((state: RootState) => state.appUi);

   // Update direction-related styles when `direction` changes
   useEffect(() => {
      const style: HTMLLinkElement | null = document.getElementById('style-direction') as HTMLLinkElement;
      if (style) {
         style.href = direction === 'rtl' ? './bootstrap.rtl.min.css' : './bootstrap.min.css';
      }
      document.body.classList.toggle('dir-rtl', direction === 'rtl');
      document.body.classList.toggle('dir-ltr', direction !== 'rtl');
   }, [direction]);

   return (
      <MySelect
         onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const newLang = e.target.value;
            dispatch(updateLanguage(newLang));
            dispatch(setDirection(newLang === 'he' ? 'rtl' : 'ltr'));
         }}
         data={[
            { value: 'he', text: 'Hebrew' },
            { value: 'en', text: 'English' }
         ]}
         valProp="value"
         contentProp="text"
         value={language}
      />
   );
};

export default LanguageSelector;