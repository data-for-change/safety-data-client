/* eslint-disable max-len */
import React from 'react';

interface IProps {
  fill?: string,
  width?: number,//original 45
  height?: number//original 37
}

const IconWalk: React.FC<IProps> = (({ fill= 'red', width = 24.6, height= 30}) => {
  return (
    // its a SVG example, it`s by half, or corrupted, to not occupy large caracter space here, use your SVG file here...
    <svg width={width} height={height} viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z" fill={fill} />
      <path fill="#FFF" d="M 8.758 11.611 L 11.571 9.763 C 11.887 9.554 12.27 9.446 12.661 9.459 C 13.64 9.48 14.495 10.06 14.793 10.902 C 14.955 11.366 15.104 11.678 15.239 11.841 C 16.067 12.839 17.368 13.427 18.749 13.426 L 18.749 15.014 C 16.913 15.016 15.173 14.274 14.008 12.993 L 13.396 16.132 L 15.204 17.504 L 17.155 22.352 L 15.506 22.895 L 13.715 18.448 L 10.74 16.189 C 10.242 15.826 10.002 15.248 10.113 14.678 L 10.56 12.388 L 9.966 12.779 L 8.099 15.102 L 6.679 14.169 L 8.743 11.601 L 8.758 11.611 Z M 11.312 19.522 L 8.492 22.562 L 7.147 21.543 L 9.759 18.729 L 10.414 16.998 L 11.986 18.189 L 11.312 19.522 Z" />
      <circle fill="#FFF" cx="24.241" cy="8.905" r="3.8" transform="matrix(0.508679, 0, 0, 0.466243, 1.41729, 3.309399)"/>
    </svg>
  );
});
export default IconWalk;
