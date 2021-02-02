import React, { PropsWithChildren } from 'react'

interface SmallCard2Props extends PropsWithChildren<any> {
   header?: string
   sizeWidth?: string
}

const SmallCard2: React.FC<SmallCard2Props> = ({ children, header, sizeWidth }) => {
   const cardHeader = header ? <> <h6>{header}</h6> <hr /> </> : null
   return (
      <div
         style={{ width: sizeWidth ? sizeWidth : '' }}
         className="my-2 p-3 bg-white rounded shadow">
         {cardHeader}
         {children}
      </div>
   )
}
export default SmallCard2