import Accident from '../types/Accident';

export const getColorByVehicle = (category: string) => {
    let res = '';
    switch (category) {
        case '':
            res = '#4cc9f0';
            break;
        case 'רכב נוסעים פרטי':
            res = '#f72585';
            break;
        case 'אופנוע עד 50 סמ"ק':
        case 'אופנוע 51 עד 125 סמ"ק':
        case 'אופנוע 126 עד 400 סמ"ק':
        case 'אופנוע 401+ סמ"ק':
            res = '#b5179e';
            break;
        case 'אופניים':
            res = '#4895ef';
            break;
        case 'אופניים חשמליים':
            res = '#3f37c9';
            break;
        case 'קורקינט חשמלי':
            res = '#3f37c9';
            break;
        default:
            res = '#FE4E00';
            break;
    }
    return res;
};

export const getColorsBySeverity = (severity: string) => {
    let res = '';
    switch (severity) {
        case 'הרוג':
            res = '#CA273B';
            break;
        default:
            res = '#F8A141';
            break;
    }
    return res;
};

export const getColorsByDayNight = (value: string) => {
    let res = '';
    switch (value) {
        case 'יום':
            res = '#ffcc00';
            break;
        default:
            res = '#333333';
            break;
    }
    return res;
};
export const getColorsByGender = (value: string) => {
    let res = '';
    switch (value) {
        case 'נקבה':
            res = '#4895ef';
            break;
        case 'זכר':
            res = '#1E6091';
            break;
        default:
            res = '#FDE2E4';
            break;
    }
    return res;
};

export const getColorByRoadType = (value: string) => {
    let res = '';
    switch (value) {
        case 'לא-עירונית לא בצומת':
        case 'עירונית לא בצומת':
            res = '#4895ef';
            break;
        case 'לא-עירונית בצומת':
        case 'עירונית בצומת':
            res = '#1E6091';
            break;
        default:
            res = '#FDE2E4';
            break;
    }
    return res;
};

export const getColors = (colorBy: string, data: Accident) => {
    let res = '';
    switch (colorBy) {
        case 'Severity':
            res = getColorsBySeverity(data.injury_severity_hebrew);
            break;
        case 'Vehicle':
            res = getColorByVehicle(data.vehicle_vehicle_type_hebrew);
            break;
        case 'DayNight':
            res = getColorsByDayNight(data.day_night_hebrew);
            break;
        case 'Gender':
            res = getColorsByGender(data.sex_hebrew);
            break;
        case 'RoadType':
            res = getColorByRoadType(data.road_type_hebrew);
            break;    
        default:
            res = getColorsBySeverity(data.injury_severity_hebrew);
            break;
    }
    return res;
};