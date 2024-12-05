import React from 'react';
import { ReactSVG } from 'react-svg';
import carIcon from '../../../assets/transport_icons/car_icon.svg'; 
import bikeIcon from '../../../assets/transport_icons/bicycle_icon.svg'; 
import questionSvg from '../../../assets/transport_icons/question_icon.svg'; 

// import { ReactComponent as CarSvg1 } from '../../../assets/transport_icons/car_icon.svg';
//import { ReactComponent as BikeSvg} from '../../../assets/transport_icons/bicycle_icon.svg';
//import { ReactComponent as QuestionSvg} from '../../../assets/transport_icons/question_icon.svg';

interface IProps {
    vType: string,
    color: string,
    size?: number
}
const IconVehicle: React.FC<IProps> = (({ vType, color, size=35 }) => {
    switch (vType) {
        case 'מכונית':
            return <ReactSVG src={carIcon} style={{ height: size, width: size }} fill={color} />          
          break;
        case 'אופניים':
            return <ReactSVG src={bikeIcon} style={{ height: size, width: size }} fill={color}/>
          break;
        default:
            return <ReactSVG src={questionSvg} style={{ height: size, width: size }} fill={color}/>
    }
});

export default IconVehicle;