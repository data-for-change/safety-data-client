import React, { PropsWithChildren } from 'react'

interface SmallCard2Props extends PropsWithChildren<any> {
   header?: string,
   style?: any,
}

const SmallCard2: React.FC<SmallCard2Props> = ({ children, header, style }) => {
   const cardHeader = header ? <> <h6>{header}</h6> <hr /> </> : null;
   return (
      <div
         style={{...style}}
         className="p-3 bg-white rounded shadow">
         {cardHeader}
         {children}
      </div>
   )
}
export default SmallCard2