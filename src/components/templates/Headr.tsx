import React from 'react';
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
export const Header: React.FC<IProps> = ({ title }:IProps) => {
  const { t } = useTranslation();

  return (
    <header style={{ marginBottom: '1rem' }}>
      <nav className="navbar navbar-expand-lg navbar-dark shadow">
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
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <Link
                className="nav-link"
                to="/"
              >
                {t('Home')}
              </Link>
              <Link
                className="nav-link"
                to="/city"
              >
                {t('Cities')}
              </Link>
              <Link
                className="nav-link"
                to="/about"
              >
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

export default Header;
