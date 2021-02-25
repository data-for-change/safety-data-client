import React, { PropsWithChildren } from 'react'
import Drawer from '../organisms/Drawer'
import '../../styles/grid-with-drawer.css'

interface Props extends PropsWithChildren<any> { }

const WithSidebarTemplate: React.FC<Props> = ({ children }) => {
   return (
      <div className="grid-with-drawer">
         <div className="grid-drawer">
            <Drawer />
         </div>
         <div className="grid-main">
            {children}
         </div>
      </div>
   )
}

export default WithSidebarTemplate
