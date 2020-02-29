import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

//export default class Footer extends React.Component {
interface IProps { }
export const Footer: React.FC<IProps> = () =>
{
    const divStyle = {
      display: 'flex',
      flexFlow: 'row wrap'
    };
    const { t } = useTranslation();
    return (
      <footer style={divStyle}>
        <nav  className= "App-nav">
          <Link to="/">{t('Home')}</Link>
          <Link to="/city">{t('Cities')}</Link>
          <Link to="/heatmap">{t('HeatMap')}</Link>
          <Link to="/about">{t('About')}</Link>
        </nav>
      </footer>
    );
}
export default Footer
