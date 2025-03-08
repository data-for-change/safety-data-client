import React from 'react'
import { useTranslation } from 'react-i18next';
import '../../styles/my-select.css'
interface Props {
   data: any[]
   onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
   valProp?: string
   contentProp?: string
   value?: string
   label?: string
   id?: string;
   style?: any
   cssClass?: string
}

const MySelect: React.FC<Props> = ({ style, id, label, onChange, data, valProp, contentProp, value, cssClass = '' }) => {
   const { t } = useTranslation();
   const cssname = "form-select form-select-sm " + cssClass;
   const labelText = label && t(label);
   const labelId = id? id: label ? `${label}-id` : undefined;
   const mappedData = data.map(item => {
      const val = valProp ? item[valProp] : item;
      const content = contentProp ? item[contentProp] : item;
      return (
         <option key={val} value={val}>
            {t(content)}
         </option>
      );
   });
   return (
      <div className="select-wrapper" style={style && style} >
         {label && <label htmlFor={labelId} style={{ 'whiteSpace': 'nowrap' }}>
            {labelText}
         </label>
         }
         <select
            id={labelId}
            className={cssname}
            onChange={onChange}
            value={value}
         >
            {mappedData}
         </select>
      </div>
   )
}

export default MySelect
