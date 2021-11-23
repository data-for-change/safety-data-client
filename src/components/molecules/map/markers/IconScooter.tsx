/* eslint-disable max-len */
import React from 'react';

interface IProps {
  fill?: string,
  width?: number,//original 45
  height?: number//original 37
}

const IconScooter: React.FC<IProps> = (({ fill = 'red', width = 24.6, height = 30 }) => {
  return (
    // its a SVG example, it`s by half, or corrupted, to not occupy large caracter space here, use your SVG file here...
    <svg width={width} height={height} viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z" fill={fill} />
      <polyline stroke="#FFF" stroke-width="1" stroke-linecap="round" points="15.363 6.284 16.84 6.284 18.811 18.838" />
      <circle stroke="#FFF" stroke-width="2" cx="28" cy="25" r="3" transform="matrix(0.492416, 0, 0, 0.62765, 5.022794, 3.145868)" />
      <circle stroke="#FFF" stroke-width="2" cx="4" cy="25" r="3" transform="matrix(0.492416, 0, 0, 0.62765, 5.022794, 3.145868)" />
      <path stroke="#FFF" stroke-width="1" stroke-linecap="round" d="M 6.993 15.07 C 8.618 15.07 9.947 16.766 9.947 18.838" />
      <polyline stroke="#FFF" stroke-width="1" stroke-linecap="round" points="17.825 13.815 15.363 18.838 6.993 18.838" />
    </svg>
  );
});
export default IconScooter;
