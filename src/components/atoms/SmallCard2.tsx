import React, { PropsWithChildren } from 'react';

interface SmallCard2Props extends PropsWithChildren<any> {
  header?: string;
  style?: React.CSSProperties;
  className?: string;
}

const SmallCard2: React.FC<SmallCard2Props> = ({ children, header, style, className }) => {
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

export default SmallCard2;