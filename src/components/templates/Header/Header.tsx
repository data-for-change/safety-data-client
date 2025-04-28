import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LanguageSelector from '../../molecules/LanguageSelector';
import NavigationList from '../../molecules/NavigationList';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/logo/safety-logo-white.png';
import { RootState, AppDispatch } from '../../../stores/store';
import { setHeaderExpanded } from '../../../stores'; 
import '../../../styles/tabs.css';
import './header.css';

interface IProps {
   title: string;
}

const Header: React.FC<IProps> = ({ title }) => {
   // Use Redux state instead of MobX
   const dispatch = useDispatch<AppDispatch>();
   const { isHeaderExpanded } = useSelector((state: RootState) => state.appUi); 

   // Use the Redux dispatch to toggle header state
   const toggleHeaderExpanded = () => {
      dispatch(setHeaderExpanded(!isHeaderExpanded)); 
   };

   return (
      <header className="header">
         <Navbar className="navbar" expand="lg" expanded={isHeaderExpanded} onToggle={toggleHeaderExpanded}>
            <div className="container-fluid">
               <img src={logo} alt={`${title} logo`} height="25" width="150" />
               <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-light" data-testid="navbar-toggle" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <div className="navbar-nav">
                     <NavigationList />
                  </div>
                  <div style={{padding: '10px 5px'}}>
                     <LanguageSelector />
                  </div>
               </Navbar.Collapse>
            </div>
         </Navbar>
      </header>
   );
};

export default Header;
