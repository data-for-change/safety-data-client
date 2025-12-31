/* eslint-disable max-len */
import React from 'react';
import { IIconProps } from '../../types';

interface Props extends IIconProps {
  fill?: string;          // transparent inner color
  stroke?: string;        // border color
  opacity?: number;       // inner transparency
  size?: number; 
}

export const IconCircle: React.FC<Props> = ({
  size = 40,
  fill = '#d22819ff',
  stroke = '#d21919ff',
  opacity = 0.35,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        fillOpacity={opacity}
        stroke={stroke}
        strokeWidth={1}
      />

      {/* center dot */}
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill="red"
      />
    </svg>
  );
};
