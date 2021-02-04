import React, { CSSProperties } from 'react'

interface IProps {
    path: string
    style: CSSProperties | undefined
}

const IconWithImage: React.FC<IProps> = ({ path, style }) => {
    return (
        <img
            style={style ? style : undefined}
            width="30"
            height="30"
            src={path}
        />
    )
}

export default IconWithImage
