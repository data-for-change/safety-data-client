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
      <header style={styles.header} >
         <Navbar className="navbar" expand="lg">
            <div className="container-fluid">
               <img
                  src={logo}
                  alt={`${title} logo`}
                  height="45"
                  width="188"
               />
               <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-light" />
               <Navbar.Collapse id="basic-navbar-nav" >
                  <div className="navbar-nav">
                     <NavigationList />
                  </div>
                  <div>
                     <LanguageSelector />
                  </div>
               </Navbar.Collapse>
            </div>
         </Navbar>
      </header>

   );
};

export default Header;
