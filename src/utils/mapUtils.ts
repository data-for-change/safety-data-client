import L from 'leaflet';
import { Accident, MarkerData } from '../types';

export const getColorByVehicle = (category: string) => {
    let res = '';
    switch (category) {
        case '':
        case 'הולך רגל':
            res = '#4cc9f0';
            break;
        case 'אופניים':
            res = '#4895ef';
            break;
        case 'אופניים חשמליים':
            res = '#3768c9';
            break;
        case 'קורקינט חשמלי':
            res = '#3f37c9';
            break;    
        case 'רכב נוסעים פרטי':
        case 'מונית':
        case 'מכונית':
            res = '#f72585';
            break;
        case 'אופנוע עד 50 סמ"ק':
        case 'אופנוע 51 עד 125 סמ"ק':
        case 'אופנוע 126 עד 400 סמ"ק':
        case 'אופנוע 401 סמ"ק ומעלה':
        case 'אופנוע':
            res = '#b5179e';
            break;
       
        case 'אוטובוס':
            res = '#c9377e';
            break;
        case 'משא':
        case 'משא 3.6 עד 9.9 טון':
        case 'משא 10.0 עד 12.0 טון':
        case 'משא 12.1 עד 15.9 טון':
        case 'משא 16.0 עד 33.9 טון':
        case 'משא 34.0+ טון':
            res = '#f8961e';
            break;
        default:
            res = '#617374';
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
            res = '#A0202F'; // red
            break;
        case 'פצוע קשה':
            res = '#D87F1D'; // orange
            break;
        default:
            res = '#E6C153'; // yellow 
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
export const getColorByPopType = (value: string) => {
    let res = '';
    switch (value) {
        case 'יהודים':
            res = '#1E6091';
            break;
        case 'ערבים':
            res = '#0ea85eff';
            break;
        case 'זרים':
            res = '#6dc587ff';
            break;
        case 'אחרים':
            res = '#5a6860ff';
            break;
        default:
            res = '#FDE2E4';
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
        case 'לא-עירונית בצומת (כולל מפגש של כביש ורחוב)':
        case 'עירונית בצומת (כולל צמתים בגבולות יישובים)':
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
        case 'Population':
            res = getColorByPopType(data.population_type_hebrew);
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

export const getNumSeverity = (severity: string) => {
    const res = (severity == 'הרוג') ?1:(severity == 'פצוע קשה')? 2:3;
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
              grade = ['הרוג', 'פצוע קשה', 'פצוע קל'];
              res = createLegendArr(grade,getColorBySeverity);
              break;
          case 'Vehicle':
              grade = ['הולך רגל', 'אופניים', 'אופניים חשמליים', 'קורקינט חשמלי','אופנוע', 'מכונית', 'אוטובוס', 'משא','אחר'];
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
          case 'Population':
              grade = ['יהודים', 'ערבים', 'זרים', 'אחרים'];
              res = createLegendArr(grade,getColorByPopType);
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

/**
 * Accidents that share (almost) the same coordinates are drawn exactly on top
 * of each other, so only the top pin is visible/clickable. This nudges each
 * member of such a group onto a tiny circle (~3m) around the shared point so
 * every pin stays visible and clickable. Groups of one are returned untouched.
 */
const OVERLAP_PRECISION = 5; // decimals of a degree, ~1m
const OVERLAP_RADIUS_DEG = 0.00003; // ~3m

export const spreadOverlappingMarkers = (markers: MarkerData[]): MarkerData[] => {
    const groups = new Map<string, MarkerData[]>();
    markers.forEach((marker) => {
        const { lat, lng } = L.latLng(marker.position);
        const key = `${lat.toFixed(OVERLAP_PRECISION)},${lng.toFixed(OVERLAP_PRECISION)}`;
        const group = groups.get(key);
        if (group) {
            group.push(marker);
        } else {
            groups.set(key, [marker]);
        }
    });

    const result: MarkerData[] = [];
    groups.forEach((group) => {
        if (group.length === 1) {
            result.push(group[0]);
            return;
        }
        const { lat, lng } = L.latLng(group[0].position);
        // compensate longitude degrees so the circle is round on the ground
        const lngScale = 1 / Math.max(Math.cos((lat * Math.PI) / 180), 0.1);
        group.forEach((marker, i) => {
            const angle = (2 * Math.PI * i) / group.length;
            result.push({
                ...marker,
                position: [
                    lat + OVERLAP_RADIUS_DEG * Math.sin(angle),
                    lng + OVERLAP_RADIUS_DEG * Math.cos(angle) * lngScale,
                ],
            });
        });
    });
    return result;
};
