import React from 'react';
import Icons from '../../assets/transport_icons/all_icons.svg'; 
//import { ReactComponent as Icons } from '../../assets/transport_icons/all_icons.svg';

interface IProps {
  name:string,
  color: string,
  size: number
}

const Icon: React.FC<IProps> = ({ name, color, size }) => (
  <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
    <use xlinkHref={`${Icons}#icon-${name}`} />
  </svg>
);

export default Icon;
