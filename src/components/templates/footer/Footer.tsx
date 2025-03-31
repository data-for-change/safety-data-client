import React, { CSSProperties } from 'react';
// import { useTranslation } from 'react-i18next';
import NavigationList from '../molecules/NavigationList';
import logoNatun from '../../assets/natun-logo.png';
import logoAnyway from '../../assets/anyway-logo.png';
import '../../styles/footer.css'
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
  return (
    <footer>
      {/* <nav style={divStyle} >
        <NavigationList />
      </nav> */}
      <a href='https://www.natoon.co.il/' title="מבית נתון לשינוי">
      <img
                        src={logoNatun}
                        alt={`natun logo`}
                        height="20"
                       
       /></a>
      <a href='https://www.anyway.co.il/' title="anyway.co.il"> <img
                  src={logoAnyway}
                  alt={`anyway logo`}
                  height="20"
                  
               />
      </a>

    </footer>
  );
};
export default Footer;
