import React from 'react'
import Card from 'react-bootstrap/Card';

interface IProps {
    title?: string
}
export const SmallCard: React.FC<IProps> = ({ title, children }) => {
    const style = {
        width: '15rem'
    };
    const styleb = {
        padding: "0.2rem"
    }
    let aHeder = title ? <Card.Header>{title}</Card.Header> : "";
    return (
        <Card style={style}>
            <Card.Body style={styleb}>
                {aHeder}
                {children}
            </Card.Body>
        </Card>
    )
}