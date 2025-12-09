import React, { PropsWithChildren } from 'react';

interface SmallCardProps extends PropsWithChildren<any> {
  header?: string;
  style?: React.CSSProperties;
  className?: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ children, header, style, className }) => {
  const cardHeader = header ? (
    <>
      <h6>{header}</h6>
      <hr />
    </>
  ) : null;

  const defaultClass = "p-3 bg-white rounded shadow";

  return (
    <div
    className={className ?? defaultClass}
      style={style}
    >
      {cardHeader}
      {children}
    </div>
  );
};

export default SmallCard;