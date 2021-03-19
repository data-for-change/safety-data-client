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
}

const MySelect: React.FC<Props> = ({ style, label, onChange, data, valProp, contentProp, value }) => {
   const { t } = useTranslation();
   return (
      <div className="select-wrapper" style={style && style} >
         {label && <label> {t(label)} </label>}
         <select className="form-select form-select-sm" onChange={onChange} value={value}>
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
