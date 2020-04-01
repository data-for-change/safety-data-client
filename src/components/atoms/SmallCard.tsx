import React from 'react'
import Card from 'react-bootstrap/Card';

interface IProps {
    title?: string,
    styleType?: number
    width?: number
}
export const SmallCard: React.FC<IProps> = ({ title, styleType = 0, width = 0, children }) => {
    const styleWidth: any[] = [
        '15rem', '20rem', '25rem', '40rem'
    ];
    let styleCard: any =
    {
        borderRadius: '5px',
        padding: '5px',
        margin: '7px'
    };
    let aHeder = title ? <Card.Header>{title}</Card.Header> : "";
    if (width > 0)
        styleCard.width = width
    else
        styleCard.width = styleWidth[styleType]
    return (
        <Card style={styleCard}>
            {aHeder}
            {children}
        </Card>
    )
}