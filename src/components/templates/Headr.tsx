import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from '../molecules/LanguageSelector';
// import ButtonMenu from '../atoms/ButtonMenu';
import logo from '../../assets/safety-logo.png';
// import Navbar from "react-bootstrap/Navbar";


interface IProps {
   title: string
}
// interface IProps { }
export const Header: React.FC<IProps> = ({ title }) => {
   // const divStyle = {
   //   display: 'flex',
   //   flexFlow: 'row wrap',
   // };
   const { t } = useTranslation();
   // const [showNavMenu, setShowNavMenu] = useState(getShowNavMenu(window.innerWidth));
   // const navMenu = (
   //   <div style={divStyle}>
   //     <nav className="App-nav">
   //       <Link to="/">{t('Home')}</Link>
   //       <Link to="/city">{t('Cities')}</Link>
   //       <Link to="/about">{t('About')}</Link>
   //     </nav>
   //   </div>
   // )
   // React.useEffect(() => {
   //   function handleResize() {
   //     const show = getShowNavMenu(window.innerWidth);
   //     setShowNavMenu(show);
   //   }
   //   window.addEventListener('resize', handleResize);
   //   return (() => { window.removeEventListener('resize', handleResize); });
   // });
   // {/* <div style={divStyle}>
   //   <img src={logo} alt="Safety-Data logo" height="45" width="188" />
   //   {navMenu}
   // </div>
   // <div className="languageSelector">
   //   <LanguageSelector />
   // </div> */}
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
