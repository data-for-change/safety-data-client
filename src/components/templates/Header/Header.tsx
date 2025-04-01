import React from 'react';
import { observer } from 'mobx-react-lite';
import LanguageSelector from '../../molecules/LanguageSelector';
import NavigationList from '../../molecules/NavigationList';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/safety-logo.png';
import { useStore } from '../../../stores/storeConfig';
import '../../../styles/tabs.css';
import './header.css';

interface IProps {
   title: string;
}

const Header: React.FC<IProps> = observer(({ title }) => {
   const { uiStore } = useStore();
   const { isHeaderExpanded, toggleHeaderExpanded } = uiStore;

   return (
      <header className="header">
         <Navbar className="navbar" expand="lg" expanded={isHeaderExpanded} onToggle={toggleHeaderExpanded}>
            <div className="container-fluid">
               <img src={logo} alt={`${title} logo`} height="45" width="188" />
               <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-light" />
               <Navbar.Collapse id="basic-navbar-nav">
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
});

export default Header;
