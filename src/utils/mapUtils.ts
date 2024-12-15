import { Accident } from '../types';

export const getColorByVehicle = (category: string) => {
    let res = '';
    switch (category) {
        case '':
        case 'הולך רגל':
            res = '#4cc9f0';
            break;
        case 'רכב נוסעים פרטי':
        case 'מכונית':
            res = '#f72585';
            break;
        case 'אופנוע עד 50 סמ"ק':
        case 'אופנוע 51 עד 125 סמ"ק':
        case 'אופנוע 126 עד 400 סמ"ק':
        case 'אופנוע 401+ סמ"ק':
        case 'אופנוע':
            res = '#b5179e';
            break;
        case 'אופניים':
            res = '#4895ef';
            break;
        case 'אופניים חשמליים':
        case 'חשמלי דו גלגלי':
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

export const getColorByAccidentType = (value: string) => {
    let res = '';
    switch (value) {
        case 'פגיעה בהולך רגל':
            res = '#f94144';
            break;
        case 'התנגשות אחור אל צד':
            res = '#277da1';
            break;
        case 'התנגשות אחור בחזית':
            res = '#577590';
            break;
        case 'התנגשות חזית באחור':
            res = '#577590';
            break;
        case 'התנגשות חזית בחזית':
            res = '#43aa8b';
            break;
        case 'התנגשות חזית בצד':
            res = '#90be6d';
            break;
        case 'התנגשות צד בצד':
            res = '#f9c74f';
            break;
        case 'התנגשות עם בעל חיים':
        case 'התנגשות עם עצם דומם':
        case 'התנגשות עם רכב חונה':
        case 'התנגשות עם רכב שנעצר ללא חניה':
            res = '#f9844a';
            break;
        case 'החלקה':
            res = '#f8961e';
            break;
        case 'התהפכות':
            res = '#f3722c';
            break;
        default:
            res = '#333333';
            break;
    }
    return res;
};

export const getColorByAccidentSelfOrNot = (value: string) => {
    let res = '';
    switch (value) {
        case 'עצמית':
        case 'החלקה':
        case 'התהפכות':
        case 'התנגשות עם עצם דומם':
        case 'התנגשות עם רכב חונה':
        case 'ירידה מהכביש או עלייה למדרכה': 
        case 'פגיעה בנוסע בתוך כלי הרכב':
        case 'נפילה מרכב נע':
            res = '#138D75';
            break;
        default:
            res = '#f94144';
            break;
    }
    return res;
};

export const getColorBySeverity = (severity: string) => {
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

export const getColorByDayNight = (value: string) => {
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
export const getColorByGender = (value: string) => {
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
        case 'לא בצומת':
            res = '#4895ef';
            break;
        case 'לא-עירונית בצומת':
        case 'עירונית בצומת':
        case 'בצומת':
            res = '#CD6155';
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
            res = getColorBySeverity(data.injury_severity_hebrew);
            break;
        case 'Vehicle':
            res = getColorByVehicle(data.vehicle_vehicle_type_hebrew);
            break;
        case 'DayNight':
            res = getColorByDayNight(data.day_night_hebrew);
            break;
        case 'Gender':
            res = getColorByGender(data.sex_hebrew);
            break;
        case 'RoadType':
            res = getColorByRoadType(data.road_type_hebrew);
            break;
        case 'AccidentType':
            res = getColorByAccidentType(data.accident_type_hebrew);
            break;
        case 'SelfOrNotAcc':
                res = getColorByAccidentSelfOrNot(data.accident_type_hebrew);
                break;    
        default:
            res = getColorBySeverity(data.injury_severity_hebrew);
            break;
    }
    return res;
};

// export const legendHtmlFor = (colorBy: string) => [
//     `<h3>${string}</h3>`,
//     description && `<p>${description}</p>`,
//   ].join('\n');
export const createLegendByColorType = (colorBy: string) =>
  {
      let grade = [];
      let res = [];
      switch (colorBy) {
          case 'Severity':
              grade = ['הרוג', 'פצוע קשה'];
              res = createLegendArr(grade,getColorBySeverity);
              break;
          case 'Vehicle':
              grade = [ 'חשמלי דו גלגלי', 'מכונית', 'אופנוע', 'לא ידוע', 'הולך רגל', 'אופניים'];
              res = createLegendArr(grade,getColorByVehicle);
              break;
          case 'DayNight':
              grade = ['לילה', 'יום',];
              res = createLegendArr(grade,getColorByDayNight);
              break;
          case 'Gender':
              grade = ['נקבה', 'זכר', 'לא ידוע'];
              res = createLegendArr(grade,getColorByGender);
              break;
          case 'RoadType':
              grade = ['לא בצומת', 'בצומת'];
              res = createLegendArr(grade,getColorByRoadType);
              break;
          case 'AccidentType':
              grade = ['התהפכות', 'החלקה', 'התנגשות אחור אל צד', 'התנגשות אחור בחזית','התנגשות חזית בצד','התנגשות צד בצד','התנגשות חזית בחזית','התנגשות עם עצם דומם','פגיעה בהולך רגל','אחר',];
              res = createLegendArr(grade,getColorByAccidentType);
              break;
          case 'SelfOrNotAcc':
              grade = ['לא עצמית','עצמית',];
              res = createLegendArr(grade,getColorByAccidentSelfOrNot);
              break;     
          default:
              grade = ['נקבה', 'זכר', 'לא ידוע'];
              res = createLegendArr(grade,getColorByGender);
              break;
      }
      return res;
  }
export const createLegendArr = (grades: string[], getColorfunc: (value: string) => any) => {
    const labels: any = [];
    grades.forEach((val: string) => {
        labels.push(
        `<div><i style="background:${getColorfunc(val)}"></i> ${val}</div>`
        );
    });
    //labels.join('\n');
    return labels;
};

