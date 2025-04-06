import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setHeaderExpanded } from '../../stores';

const NavigationList: React.FC = () => {
   const { t } = useTranslation();
   const dispatch = useDispatch(); 
   const handleLinkClick = () => {
      dispatch(setHeaderExpanded(false));
   };

   return (
      <>
         <Link className="nav-link" to="/" onClick={handleLinkClick} data-testid="home-link">
            {t('National')}
         </Link>
         <Link className="nav-link" to="/city" onClick={handleLinkClick} data-testid="city-link">
            {t('Cities')}
         </Link>
         <Link className="nav-link" to="/recommend" onClick={handleLinkClick} data-testid="recommend-link">
            {t('Recommendations')}
         </Link>
         <Link className="nav-link" to="/about" onClick={handleLinkClick} data-testid="about-link">
            {t('About')}
         </Link>
      </>
   );
};
export default NavigationList;