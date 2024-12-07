/* eslint-disable max-len */
import React from 'react';

interface IProps {
  fill?: string,
  width?: number,//original 45
  height?: number//original 37
}

const IconBus: React.FC<IProps> = (({ fill = 'red', width = 24.6, height = 30 }) => {
  return (
    // its a SVG example, it`s by half, or corrupted, to not occupy large caracter space here, use your SVG file here...
    <svg width={width} height={height} viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z" fill={fill} />
      <path id="svg_2" d="M 8 19.5 C 5.8 19.5 4.4 17.3 5.5 15.6 C 6.6 13.9 9.4 13.9 10.5 15.6 C 10.8 16 10.9 16.4 10.9 16.9 C 10.9 18.3 9.6 19.5 8 19.5 Z M 8 16 C 7.3 16 6.8 16.8 7.2 17.3 C 7.5 17.9 8.5 17.9 8.8 17.3 C 8.9 17.2 9 17 9 16.9 C 9 16.4 8.5 16 8 16 Z" stroke="none" fill="#ffffff"></path>
      <path id="svg_3" d="M 18.2 19.6 C 16 19.6 14.6 17.4 15.7 15.7 C 16.8 14 19.6 14 20.7 15.7 C 20.9 16.1 21.1 16.5 21.1 17 C 21.1 18.4 19.8 19.6 18.2 19.6 Z M 18.2 16.1 C 17.4 16.1 17 16.9 17.4 17.4 C 17.7 18 18.7 18 19 17.4 C 19.1 17.3 19.2 17.1 19.2 17 C 19.2 16.5 18.7 16.1 18.2 16.1 Z" fill="#ffffff"></path>
      <path id="svg_4" d="M 15.8 17.8 L 9.9 17.8 C 9.3 17.8 8.9 17 9.2 16.5 C 9.3 16.2 9.6 16 9.9 16 L 15.8 16 C 16.5 16 16.9 16.8 16.6 17.3 C 16.4 17.6 16.1 17.8 15.8 17.8 Z" fill="#ffffff"></path>
      <path id="svg_5" d="M 5.9 17.6 L 4.9 17.6 C 3.9 17.6 3 16.9 3 16 L 3 8.7 C 3 7.3 4.3 6.2 5.9 6.2 L 17.5 6.2 C 20.1 6.2 22.3 8.1 22.3 10.3 L 22.3 13.6 C 22.3 14.2 21.5 14.6 20.8 14.3 C 20.5 14.1 20.3 13.9 20.3 13.6 L 20.3 10.3 C 20.3 9 19.1 7.9 17.5 7.9 L 5.9 7.9 C 5.4 7.9 4.9 8.2 4.9 8.7 L 4.9 16 L 5.9 16 C 6.6 16 7.1 16.7 6.7 17.2 C 6.5 17.5 6.2 17.6 5.9 17.6 Z" fill="#ffffff"></path>
      <path id="svg_6" stroke="#ffffff" d="M 20.5 11.8 L 8.9 11.8 C 8.2 11.8 7.7 11.5 8.1 11.2 C 8.2 11 8.6 10.9 8.9 10.9 L 20.5 10.9 C 21.2 10.9 21.7 11.3 21.3 11.6 C 21.1 11.8 20.8 11.8 20.5 11.8 Z" fill="#ffffff"></path>
      <path id="svg_7" d="M 21.3 11.7 L 21.3 10.8 C 21.3 8.9 19.7 7.4 17.8 7.4 L 17.8 11.7 L 21.3 11.7 Z" fill="#ffffff"></path>
    </svg>
  );
});
export default IconBus;
