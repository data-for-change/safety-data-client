import React from 'react'
import { useTranslation } from 'react-i18next';

interface Props {
   data: any[]
   onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
   valProp: string
   contentProp: string
   deafaultVal?: string
   label?: string
}

const MySelect: React.FC<Props> = ({ label, onChange, data, valProp, contentProp, deafaultVal }) => {
   const { t } = useTranslation();

   return (
      <div className="select-wrapper">
         {label && <label> {t(label)} </label>}
         <select className="my-select" onChange={onChange} defaultValue={deafaultVal}>
            {data.map((item) => {
               return <option key={item[valProp]} value={item[valProp]}>{t(item[contentProp])}</option>
            })}
         </select>
      </div>
   )
}

export default MySelect
