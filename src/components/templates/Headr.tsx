import React from 'react';
import LanguageSelector from '../molecules/LanguageSelector';
import logo from '../../assets/safety-logo.png';
import NavigationList from '../molecules/NavigationList';
import Navbar from 'react-bootstrap/Navbar'



interface IProps {
   title: string
}

const styles = {
   header: {
      marginBottom: '1rem',
      position: 'fixed' as 'fixed',
      top: '0px',
      width: '100%',
      zIndex: 5000,
   }
};

export const Header: React.FC<IProps> = ({ title }) => {

   return (
      <header style={styles.header}>
         <Navbar className="navbar" expand="lg">
            <div className="container-fluid">
               <img
                  src={logo}
                  alt={`${title} logo`}
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
                  alt={`${title} logo`}
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
