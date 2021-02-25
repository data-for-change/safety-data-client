import React, { CSSProperties } from 'react';
// import { useTranslation } from 'react-i18next';
import NavigationList from '../molecules/NavigationList';
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
      <nav style={divStyle} >
        <NavigationList />
      </nav>
    </footer>
  );
};
export default Footer;
