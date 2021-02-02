import React, { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import NavigationList from '../molecules/NavigationList';

interface IProps { }
export const Footer: React.FC<IProps> = () => {
  const divStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'var(--primary-color)',
    color: 'var(--onprimary-color)',
    height: '4rem'
  } as CSSProperties
  const { t } = useTranslation();
  return (
    <footer>
      <nav style={divStyle} >
        {/* <Link to="/">{t('Home')}</Link>
        <Link to="/city">{t('Cities')}</Link>
        <Link to="/about">{t('About')}</Link> */}

        <NavigationList />
      </nav>
    </footer>
  );
};
export default Footer;
