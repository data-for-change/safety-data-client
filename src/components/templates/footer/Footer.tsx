import React from 'react';
import logoNatun from '../../../assets/logo/natun-logo.png';
import logoAnyway from '../../../assets/logo/anyway-logo.png';
import './footer.css';

interface IProps { }

export const Footer: React.FC<IProps> = () => {
 
  const versionLabel = 'ver: 24/07/2026';

  return (
    <footer className="footer">
      <div className="footer-logos">
        <a href="https://www.natoon.co.il/" title="מבית נתון לשינוי">
          <img src={logoNatun} alt="Natun logo" />
        </a>

        <a href="https://www.anyway.co.il/" title="anyway.co.il">
          <img src={logoAnyway} alt="Anyway logo" />
        </a>
      </div>

      <div className="footer-text">
        פותח בשיתוף המטה לבטיחות בדרכים בעיריית תל אביב-יפו
      </div>

      <div className="footer-version">
        {versionLabel}
      </div>
    </footer>
  );
};

export default Footer;