import React from 'react';
import { useTranslation } from 'react-i18next';
import {LanguageSelector} from '../molecules/LanguageSelector';
import { Link } from 'react-router-dom';

interface IProps {
  title: string
}
interface IProps { }
export const Header: React.FC<IProps> = ({title}) =>{
  const divStyle = {
    display: 'flex',
    flexFlow: 'row wrap'
  };
  const hederTitle ={
    fontSize: '30px',
    paddingLeft: '20px',
    paddingRight: '20px'
  }
  const { t } = useTranslation();
  return (
    <header className="App-header">
    <h1 style={hederTitle}>
      {title}
    </h1>
    <div style={divStyle}>
      <nav  className= "App-nav">
        <Link to="/">{t('Home')}</Link>
        <Link to="/city">{t('Cities')}</Link>
        <Link to="/about">{t('About')}</Link>
      </nav>
    </div>
    <div className="languageSelector">
      <LanguageSelector/>
    </div>
  </header> 
  );
}
export default Header;
 