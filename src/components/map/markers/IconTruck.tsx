/* eslint-disable max-len */
import React from 'react';
import {IIconProps} from '../../types';

export const IconTruck: React.FC<IIconProps> = (({ fill = 'red', width = 24.6, height = 30, isAccuratePos = true} ) => {
  return (
    // its a SVG example, it`s by half, or corrupted, to not occupy large caracter space here, use your SVG file here...
    <svg width={width} height={height} viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z" fill={fill} />
      <path fill="#FFF" d="m6.66667,22a3,3 0 1 1 3,-3a3,3 0 0 1 -3,3zm0,-4a1,1 0 1 0 1,1a1,1 0 0 0 -1,-1z" id="svg_2" />
      <path fill="#FFF" d="m18.66667,22a3,3 0 1 1 3,-3a3,3 0 0 1 -3,3zm0,-4a1,1 0 1 0 1,1a1,1 0 0 0 -1,-1z" id="svg_3" />
      <path fill="#FFF" d="m13.66667,20l-5,0a1,1 0 0 1 0,-2l4,0l0,-10l-8,0l0,8a1,1 0 0 1 -2,0l0,-9a1,1 0 0 1 1,-1l10,0a1,1 0 0 1 1,1l0,12a1,1 0 0 1 -1,1z" id="svg_4" />
      <path fill="#FFF" d="m21.66667,16a1,1 0 0 1 -1,-1l0,-0.67l-2.2,-2.93a1,1 0 0 0 -0.8,-0.4l-4,0a1,1 0 0 1 0,-2l4,0a3,3 0 0 1 2.4,1.2l2.4,3.2a1,1 0 0 1 0.2,0.6l0,1a1,1 0 0 1 -1,1z" id="svg_5" />
      <path fill="#FFF" d="m20.66667,14l-2,0a2,2 0 0 1 -2,-2l0,-2l2,0l2,4z" id="svg_6" />
      <path fill="#FFF" d="m19.66667,14l-3,0a1,1 0 0 1 0,-2l3,0a1,1 0 0 1 0,2z" id="svg_7" />
      {!isAccuratePos && <path transform="matrix(0.2, 0, 0, 0.2, 9, 28)" fill="#000000" d="M13.98,0.84v12.66L1.94,9.59L0,15.6l12.05,3.92l-7.45,10.26l5.09,3.7L17.15,23.18l7.45,10.26l5.09-3.7L22.29,19.5L34,15.6l-1.94-5.98l-12.05,3.92V0.85H13.98L13.98,0.84z"/>}
    </svg>
  );
});
