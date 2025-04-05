import React, { CSSProperties } from 'react';
import logoNatun from '../../../assets/logo/natun-logo.png';
import logoAnyway from '../../../assets/logo/anyway-logo.png';
import './footer.css';

interface IProps {}

export const Footer: React.FC<IProps> = () => {
  const footerStyle: CSSProperties = {
    display: 'flex',
    gap: '1rem',
    height: '4rem',
    padding: '1rem',
  };

  const linkStyle: CSSProperties = {
    display: 'flex',
  };

  const imgStyle: CSSProperties = {
    height: '30px',
  };

  return (
    <footer style={footerStyle}>
      <a href="https://www.natoon.co.il/" title="מבית נתון לשינוי" style={linkStyle}>
        <img src={logoNatun} alt="Natun logo" style={imgStyle} />
      </a>
      <a href="https://www.anyway.co.il/" title="anyway.co.il" style={linkStyle}>
        <img src={logoAnyway} alt="Anyway logo" style={imgStyle} />
      </a>
    </footer>
  );
};

export default Footer;