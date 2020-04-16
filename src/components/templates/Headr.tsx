import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageSelector } from '../molecules/LanguageSelector';
import ButtonMenu from '../atoms/ButtonMenu';
import logo from '../../assets/safety-logo.png';


interface IProps {
  title: string
}
interface IProps { }
export const Header: React.FC<IProps> = ({ title }) => {
  const divStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
  };
  const { t } = useTranslation();
  const [showNavMenu, setShowNavMenu] = useState(getShowNavMenu(window.innerWidth));
  const navMenu = (showNavMenu) ? (
    <div style={divStyle}>
      <nav className="App-nav">
        <Link to="/">{t('Home')}</Link>
        <Link to="/city">{t('Cities')}</Link>
        <Link to="/about">{t('About')}</Link>
      </nav>
    </div>
  ) : <ButtonMenu />;
  React.useEffect(() => {
    function handleResize() {
      const show = getShowNavMenu(window.innerWidth);
      setShowNavMenu(show);
    }
    window.addEventListener('resize', handleResize);
    return (() => { window.removeEventListener('resize', handleResize); });
  });
  return (
    <header className="App-header">
      <div style={divStyle}>
        <img src={logo} alt="Safety-Data logo" height="45" width="188" />
        {navMenu}
      </div>
      <div className="languageSelector">
        <LanguageSelector />
      </div>
    </header>
  );
};
const getShowNavMenu = (width: number) => {
  let res = true;
  if (width <= 530) res = false;
  return res;
};

export default Header;
