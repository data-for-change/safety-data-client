import { ItemCount, ItemCount2 } from "../types";

export const reGroupResultIsSelfAcc = (data: ItemCount[]| ItemCount2[] ) => {
     // Type guard for ItemCount[]
      const isItemCountArray = (arr: any[]): arr is ItemCount[] =>
    typeof arr[0]?.count === "number";

    if (isItemCountArray(data)) {
           let res = [];
        res.push({ _id: 'תאונה עצמית', count: 0 });
        res.push({ _id: 'תאונה לא עצמית', count: 0 });
        data.forEach(element => {
            if (isSelfAccident(element._id)) {
                res[0].count += element.count;
            }else{
                res[1].count += element.count;
            }
        });
        return res;
    }else{
        return data;
    }
    
  
 
}
export const isSelfAccident= ( val :string) => {
    let res = false;
    switch (val) {
        case 'עצמית':
        case 'החלקה':
        case 'התהפכות':
        case 'התנגשות עם עצם דומם':
        case 'התנגשות עם רכב חונה':
        case 'ירידה מהכביש או עלייה למדרכה':
        case 'פגיעה בנוסע בתוך כלי הרכב':
        case 'נפילה מרכב נע':
            res = true;
            break;
        default:
            res = false;
    }
    return res;
}

export const changeInjuredTypeValues = (
  data: ItemCount[] | ItemCount2[]
): ItemCount[] | ItemCount2[] => {

  return data.map(item => {
    let newId = item._id;

    if (newId === 'נהג - רכב לא ידוע') {
      newId = 'נהג - מיקרומוביליטי';
    } else if (newId === 'נוסע - רכב לא ידוע') {
      newId = 'נוסע - מיקרומוביליטי';
    }

    // type-cast to "typeof item"
    return {
      ...item,
      _id: newId
    } as typeof item;
  }) as typeof data;  // cast the whole array
};

