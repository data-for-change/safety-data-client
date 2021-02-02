import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const NavigationList: React.FC<any> = () => {
   const { t } = useTranslation();
   return (
      <React.Fragment>
         <Link
            className="nav-link"
            to="/">
            {t('Home')}
         </Link>
         <Link
            className="nav-link"
            to="/city">
            {t('Cities')}
         </Link>
         <Link
            className="nav-link"
            to="/about">
            {t('About')}
         </Link>
      </React.Fragment>
   )
}

export default NavigationList
