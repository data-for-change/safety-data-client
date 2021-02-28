import React from 'react'
import { useTranslation } from 'react-i18next';
import '../../styles/my-select.css'
interface Props {
   data: any[]
   onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
   valProp?: string
   contentProp?: string
   deafaultVal?: string
   label?: string
}

const MySelect: React.FC<Props> = ({ label, onChange, data, valProp, contentProp, deafaultVal }) => {
   const { t } = useTranslation();

   return (
      <div className="select-wrapper" >
         {label && <label> {t(label)} </label>}
         <select className="form-select form-select-sm" onChange={onChange} defaultValue={deafaultVal}>
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
