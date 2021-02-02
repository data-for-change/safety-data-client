import React from 'react';

interface IProps { }

const AboutPage: React.FC<IProps> = () => {
   const style = {
      margin: "20px",
   };
   const styleDiv = {
      marginBottom: "10px",
   };
   return (
      <main>
         <div className="heb" style={style}>
            <div style={styleDiv}> Safety Data מציג נתונים על תאונות דרכים, בדגש על נפגעים בתאונות קשות וקטלניות.
            האתר מתמקד בניתוח בתאונות קטלניות, מיקוד זה הוא על פי "חזון אפס הרוגים בתאונות דרכים" ששואף להביא לאפס את הנפגעים בתאונות קשות וקטלניות.
            </div>
            <div style={styleDiv}>
               האתר מציע מגוון אפשרויות לבצע חיתוכים של הנתונים, לקבץ אותם ולהציגם בצורות שונות, בתקווה שדבר זה יסייע להבנה טובה יותר למניעת תאונות.
            </div>
            <div style={styleDiv}>
               כך תוכלו לראות לדוגמה
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
               מקור הנתונים על התאונות הוא הלמ"ס , דרך מנוע הנתונים של פרויקט <a href={'https://www.anyway.co.il'} target="_blank" rel="noopener noreferrer">Anyway</a>  של הסדנא לידע ציבורי. המפה באתר היא תודות לפרויקט <a href={'https://www.openstreetmap.org/'} target="_blank" rel="noopener noreferrer">OpenStreetMap</a>.
             </div>
         </div>
      </main>
   );
}
export default AboutPage
