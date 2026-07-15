import React, { CSSProperties } from 'react';
import logoNatun from '../../../assets/logo/natun-logo.png';
import logoAnyway from '../../../assets/logo/anyway-logo.png';
import './footer.css';

interface IProps {}

export const Footer: React.FC<IProps> = () => {
  const footerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem',
    padding: '1rem',
  };

  const logoGroupStyle: CSSProperties = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  };

  const imgStyle: CSSProperties = {
    height: '30px',
  };

  const centerTextStyle: CSSProperties = {
    fontSize: '14px',
    paddingTop: '5px',
    textAlign: 'center',
    flex: 1,
  };

  const versionStyle: CSSProperties = {
    fontSize: '12px',
    color: '#666',
  };

  const versionLabel = 'ver: 15/07/2026';

  return (
    <footer style={footerStyle}>
      <div style={logoGroupStyle}>
        <a href="https://www.natoon.co.il/" title="מבית נתון לשינוי">
          <img src={logoNatun} alt="Natun logo" style={imgStyle} />
        </a>
        <a href="https://www.anyway.co.il/" title="anyway.co.il">
          <img src={logoAnyway} alt="Anyway logo" style={imgStyle} />
        </a>
      </div>
      <span style={centerTextStyle}>פותח בשיתוף המטה לבטיחות בדרכים בעיריית תל אביב-יפו</span>
      <span style={versionStyle}>{versionLabel}</span>
    </footer>
  );
};

export default Footer;