import React from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { Link } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import menuIcon from '../../assets/menu_white.png';
import { useStore } from '../../stores/storeConfig'


interface IProps {
}

const ButtonMenu: React.FC<IProps> = observer((() => {
    const styleButton = {
        backgroundColor: '#007bff'
    }
    const styleLink = {
        color: '#004ba0'
    }
    const { t } = useTranslation();
    const store = useStore();
    const alignRight= (store.language === 'he') ? true: false;
    return (
        <div >
            {/* <Button variant="primary" size="sm" onClick={() => { }}>
                <img src={menuIcon} alt="menu" height="25" width="25" />
            </Button> */}
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={styleButton}>
                    <img src={menuIcon} alt="menu" height="25" width="25" />
                </Dropdown.Toggle>
                <Dropdown.Menu  alignRight={alignRight}>
                    <Dropdown.Item as="button" ><Link style={styleLink} to="/">{t('Home')}</Link></Dropdown.Item>
                    <Dropdown.Item as="button" ><Link style={styleLink} to="/city">{t('Cities')}</Link></Dropdown.Item>
                    <Dropdown.Item as="button" ><Link style={styleLink} to="/about">{t('About')}</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )

}))
export default ButtonMenu
