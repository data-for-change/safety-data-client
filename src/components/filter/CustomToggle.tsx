import React, { useState } from 'react';
import { useAccordionButton } from 'react-bootstrap';
import '../../styles/accordion.css'

interface IProps {
   children: any;
   isValid: boolean;
   eventKey: any;
   onClick: any;
}

const STYLE_TOGGLE_WARNING = {
   // color: '#dc3545',
   // cursor: 'pointer',
   // paddingRight: '15px',
   // paddingLeft: '15px',
};
const STYLE_TOGGLE_NORMAL = {
   color: '#007bff',
   cursor: 'pointer',
   // paddingRight: '15px',
   // paddingLeft: '15px',
};

function CustomToggle({ children, isValid, eventKey, onClick }: IProps) {
    const [hover, setHover] = useState(false);
    const toggleHover = () => setHover(!hover);
    const styleToggle = isValid ? STYLE_TOGGLE_NORMAL : STYLE_TOGGLE_WARNING;
    const linkStyle = (hover) ? { textDecoration: 'underline' } : { textDecoration: 'none' };
    const onButtonClick = useAccordionButton(eventKey, () => onClick(eventKey));
    return (
       <div>
          <a style={{ ...styleToggle, ...linkStyle }} onClick={onButtonClick}
             onMouseEnter={toggleHover}
             onMouseLeave={toggleHover}>
             {children}
          </a>
       </div>
    );
 }
export default CustomToggle;