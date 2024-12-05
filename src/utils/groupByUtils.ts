import Footer from "../components/templates/Footer";

export const reGroupResultIsSelfAcc = (data: any[]) => {
    console.log('reGroupResultIsSelfAcc',data)
    let res = new Array();
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