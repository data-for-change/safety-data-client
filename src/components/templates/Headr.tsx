import React from 'react';
import LanguageSelector from '../molecules/LanguageSelector';
import logo from '../../assets/safety-logo.png';
import NavigationList from '../molecules/NavigationList';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'




interface IProps {
   title: string
}
export const Header: React.FC<IProps> = ({ title }) => {
   return (
      <header style={{ marginBottom: '1rem' }}>
         <Navbar className="navbar" expand="lg">
            <div className="container-fluid">
               <img
                  src={logo}
                  alt="Safety-Data logo"
                  height="45"
                  width="188"
               />
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav" >
                  <div className="navbar-nav">
                     <NavigationList />
                  </div>
               </Navbar.Collapse>
               <div>
                  <LanguageSelector />
               </div>
            </div>
         </Navbar>
         {/* <nav className="navbar navbar-expand-lg navbar-dark shadow">
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
         </nav> */}
      </header>
   );
};

export default Header;
