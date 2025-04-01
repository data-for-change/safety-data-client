import React from 'react';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../stores/storeConfig';

const NavigationList: React.FC = observer(() => {
   const { t } = useTranslation();
   const { uiStore } = useStore();
   const {setHeaderExpanded} = uiStore;

   const handleLinkClick = () => {
      setHeaderExpanded(false);
   };

   return (
      <>
         <Link className="nav-link" to="/" onClick={handleLinkClick} data-testid="home-link">
            {t('Home')}
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
});
export default NavigationList;