import React, { CSSProperties } from 'react'

interface IProps {
    path: string;
    style: CSSProperties | undefined;
    alt: string;
}

const IconWithImage: React.FC<IProps> = ({ path,alt, style }) => {
    return (
        <img
            style={style ? style : undefined}
            width="30"
            height="30"
            src={path}
            alt={alt}
        />
    )
}

export default IconWithImage
