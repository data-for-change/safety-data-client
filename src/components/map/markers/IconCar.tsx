/* eslint-disable max-len */
import React from 'react';

interface IProps {
  fill?: string,
  width?: number,//original 45
  height?: number//original 37
}

export const IconCar: React.FC<IProps> = (({ fill= 'red', width = 24.6, height= 30}) => {
  return (
  // its a SVG example, it`s by half, or corrupted, to not occupy large caracter space here, use your SVG file here...
    <svg width={width} height={height} viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0C6.0974 0 0.481453 5.83195 0.481453 13C0.481453 15.1519 0.999529 17.2855 1.98441 19.1779L12.3154 33.5811C12.4529 33.8397 12.715 34 13 34C13.285 34 13.547 33.8397 13.6846 33.5811L24.0194 19.1715C25.0005 17.2855 25.5185 15.1518 25.5185 12.9999C25.5185 5.83195 19.9026 0 13 0Z" fill={fill} />
      <circle stroke="#FFF" cx="5.116" cy="17.427" r="3" id="svg_2" transform="matrix(0.681942, 0, 0, 0.723209, 3.744888, 3.238379)" />
      <circle stroke="#FFF" cx="21.116" cy="17.427" r="3" id="svg_3" transform="matrix(0.681942, 0, 0, 0.723209, 3.744888, 3.238379)" />
      <line stroke="#FFF" x1="21.554" x2="22.918" y1="12.948" y2="12.948" id="svg_4" />
      <line stroke="#FFF" x1="5.188" x2="18.827" y1="10.78" y2="10.78" id="svg_5" />
      <line stroke="#FFF" x1="11.326" x2="9.279" y1="6.44" y2="10.78" id="svg_6" />
      <path stroke="#FFF" d="M 20.191 15.842 L 22.918 15.842 C 23.327 15.842 23.6 15.552 23.6 15.118 L 23.6 13.672 C 23.6 12.082 22.373 10.78 20.872 10.78 L 18.827 10.78 L 16.235 7.453 C 15.69 6.802 14.94 6.44 14.122 6.44 L 8.938 6.44 C 7.915 6.44 6.961 7.091 6.483 8.031 L 5.188 10.78 L 4.506 10.78 C 3.756 10.78 3.142 11.431 3.142 12.226 L 3.142 15.118 C 3.142 15.552 3.415 15.842 3.824 15.842 L 5.188 15.842" id="svg_7" />
      <line stroke="#FFF" x1="9.279" x2="16.099" y1="15.842" y2="15.842" id="svg_8" />
    </svg>
  );
});
