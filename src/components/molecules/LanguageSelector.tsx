import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../stores/store';
import { setDirection } from '../../stores';
import { updateLanguage } from '../../stores/ui/appUiThunks';
import MySelect from '../atoms/MySelect';

const LanguageSelector = () => {
   const dispatch = useDispatch<AppDispatch>();  
   const { language } = useSelector((state: RootState) => state.appUi);
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