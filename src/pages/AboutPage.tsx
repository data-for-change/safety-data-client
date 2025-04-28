import React from 'react';
import { Card } from 'react-bootstrap';

interface IProps { }

const AboutPage: React.FC<IProps> = () => {
   const style = {
      margin: "20px",
   };
   const styleDiv = {
      marginBottom: "10px",
   };
   return (
      <Card className="p-3 bg-white rounded shadow">
         <div>
            <div className="heb" style={style}>
               <div style={styleDiv}>
                  האתר 'Safety Data' מציג נתונים על תאונות דרכים, עם דגש על נפגעים בתאונות קשות וקטלניות. המיקוד העיקרי הוא בניתוח תאונות קטלניות, תוך שמירה על העיקרון של
                  &nbsp;<a href="https://he.wikipedia.org/wiki/%D7%97%D7%96%D7%95% D7%95%D7%9F_%D7%90%D7%A4%D7%A1" target="_blank">
                     חזון אפס הרוגים בתאונות דרכים
                  </a>
                  , ששואף למנוע כל נפגע בתאונות דרכים קשות וקטלניות.
               </div>
               <div style={styleDiv}>
                  האתר מציע מגוון אפשרויות לבצע חיתוכים של הנתונים, לקבץ אותם ולהציגם בצורות שונות, בתקווה שדבר זה יסייע להבנה טובה יותר למניעת תאונות.
               </div>
               <div style={styleDiv}>
               תוכלו לראות לדוגמה
               </div>
               <div style={styleDiv}>
                  <ul>
                     <li>מה הבדלים בין היפגעות נשים וגברים, וגם במה שונים כלי הרכב שבהן נשים נפגעות לעומת גברים.</li>
                     <li> באיזה מקומות נפגעים נהגי מכוניות ומה סוגי התאונות הקטלניות השכיחות ביותר – בעיר ומחוץ לעיר.</li>
                     <li>כמה רוכבי אופנוע צעירים נהרגו , איפה הם נפגעו ומה היה סוג התאונה. </li>
                     <li> כמה הולכי רגל או רוכבי אופניים נפגעו בתל אביב , או כמה הולכי רגל נפגעו בשעות הלילה בירושלים. </li>
                  </ul>
               </div>
               <div style={styleDiv}>
                  מקור הנתונים על התאונות הוא הלמ"ס, דרך מנוע הנתונים של פרויקט
                  &nbsp;<a href={'https://www.anyway.co.il'} target="_blank" rel="noopener noreferrer">Anyway</a>&nbsp;
                  של <a href={'https://www.natoon.co.il'} target="_blank" rel="noopener noreferrer">נתון לשינוי</a>.
                  המפה באתר היא תודות לפרויקט &nbsp;
                  <a href={'https://www.openstreetmap.org/'} target="_blank" rel="noopener noreferrer">OpenStreetMap</a>.
               </div>
            </div>
         </div>
      </Card>
   );
}

export default AboutPage
