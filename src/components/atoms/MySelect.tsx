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
   style?: any
   cssClass?: string
}

const MySelect: React.FC<Props> = ({ style, label, onChange, data, valProp, contentProp, value, cssClass='' }) => {
   const { t } = useTranslation();
   const cssname= "form-select form-select-sm " + cssClass;
   return (
      <div className="select-wrapper" style={style && style} >
         {label && <label> {t(label)} </label>}
         <select className={cssname} onChange={onChange} value={value}>
            {data.map((item) => {
               return <option
                  key={valProp ? item[valProp] : item}
                  value={valProp ? item[valProp] : item}>
                  {t(contentProp ? item[contentProp] : item)}
               </option>
            })}
         </select>
      </div>
   )
}

export default MySelect
