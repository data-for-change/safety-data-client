import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSelector from '../molecules/LanguageSelector';
import logo from '../../assets/safety-logo.png';
import { useTranslation } from 'react-i18next';
import NavigationList from '../molecules/NavigationList';


interface IProps {
   title: string
}
export const Header: React.FC<IProps> = ({ title }) => {
   const { t } = useTranslation();
   return (
      <header style={{ marginBottom: '1rem' }}>
         <nav className="navbar navbar-expand-lg navbar-dark shadow">
            <div className="container-fluid">
               <img
                  src={logo}
                  alt="Safety-Data logo"
                  height="45"
                  width="188"
               />
               <button
                  className="navbar-toggler active"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div
                  className="collapse navbar-collapse"
                  id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                     <NavigationList />
                  </div>
               </div>
               <div>
                  <LanguageSelector />
               </div>
            </div>
         </nav>
      </header>
   );
};
// const getShowNavMenu = (width: number) => {
//   let res = true;
//   if (width <= 530) res = false;
//   return res;
// };

export default Header;
