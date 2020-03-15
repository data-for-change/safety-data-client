import React from 'react'
import Card from 'react-bootstrap/Card';

interface IProps {
    title?: string,
    styleType?: number
    width?:number
}
export const SmallCard: React.FC<IProps> = ({ title, styleType=0,width=0,children }) => {
    const style:any = [
        { width: '15rem'}
        ,{ width: '19rem'}
        ,{ width: '25rem'}
        ,{ width: '40rem'}
    ];
    const stylebody = {
        padding: "0.2rem"
    }
    let aHeder = title ? <Card.Header>{title}</Card.Header> : "";
    let aStyle= style[styleType];
    if (width >0)
        aStyle = {"width": width}
    return (
        <Card style={aStyle}>
            <Card.Body style={stylebody}>
                {aHeder}
                {children}
            </Card.Body>
        </Card>
    )
}