import React, { PropsWithChildren } from 'react'

interface SmallCard2Props extends PropsWithChildren<any> {
   header?: string;
   sizeWidth?: string;
   sizeHeight?: string;
}

const SmallCard2: React.FC<SmallCard2Props> = ({ children, header, sizeWidth, sizeHeight }) => {
   const cardHeader = header ? <> <h6>{header}</h6> <hr /> </> : null;
   const x = 5;
   return (
      <div
         style={{
            width: sizeWidth ? sizeWidth : '',
            height: sizeHeight ? sizeHeight : ''
         }}
         className=" p-3 bg-white rounded shadow">
         {cardHeader}
         {children}
      </div>
   )
}
export default SmallCard2