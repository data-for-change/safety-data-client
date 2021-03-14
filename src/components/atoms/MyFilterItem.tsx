import React from 'react'

interface IProps {
   description: string
   url: string
}

const MyFilterItem: React.FC<IProps> = ({ url, description }) => {
   return (
      <>
         <div className="d-flex text-muted pt-3">
            <p className="pb-3 mb-0 small lh-sm">
               <strong className="d-block text-gray-dark">{description}</strong>
               <a href={url}>{url}</a>
            </p>
         </div>
         <hr />
      </>
   )
}

export default MyFilterItem
