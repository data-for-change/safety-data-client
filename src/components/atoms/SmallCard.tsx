import React from 'react'
import Card from 'react-bootstrap/Card';

interface IProps {
    title?: string,
    styleType?: number
}
export const SmallCard: React.FC<IProps> = ({ title, styleType=0,children }) => {
    const style:any = [
        { width: '15rem'}
        ,{ width: '19rem'}
        ,{ width: '25rem'}
        ,{ width: '40rem'}
    ];
    const styleb = {
        padding: "0.2rem"
    }
    let aHeder = title ? <Card.Header>{title}</Card.Header> : "";
    return (
        <Card style={style[styleType]}>
            <Card.Body style={styleb}>
                {aHeder}
                {children}
            </Card.Body>
        </Card>
    )
}