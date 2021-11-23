import React from 'react';
import { ReactComponent as CarSvg } from '../../../assets/transport_icons/car_icon.svg';
import { ReactComponent as BikeSvg} from '../../../assets/transport_icons/bicycle_icon.svg';
import { ReactComponent as MotorcycleSvg} from '../../../assets/transport_icons/motorcycle_icon.svg';
import { ReactComponent as WalkSvg} from '../../../assets/transport_icons/walk_icon.svg';
import { ReactComponent as TruckSvg} from '../../../assets/transport_icons/truck_icon.svg';
import { ReactComponent as BusSvg} from '../../../assets/transport_icons/bus_icon.svg';
import { ReactComponent as ScooterSvg} from '../../../assets/transport_icons/scooter_icon.svg';
import { ReactComponent as QuestionSvg} from '../../../assets/transport_icons/question_icon.svg';

interface IProps {
    vType: string,
    color: string,
    size?: number
}
const IconVehicle: React.FC<IProps> = (({ vType, color, size=35 }) => {
    switch (vType) {
        case 'מכונית':
            return <CarSvg style={{ height: size, width: size }} fill={color}/>
          break;
        case 'אופניים':
            return <BikeSvg style={{ height: size, width: size }} fill={color}/>
          break;
        default:
            return <QuestionSvg style={{ height: size, width: size }} fill={color}/>
    }
});

export default IconVehicle;