/* eslint-disable max-len */
import React from 'react';

interface IProps {
  fill?: string,
  width?: number,//original 45
  height?: number//original 37
}

const IconMotorcycle: React.FC<IProps> = (({ fill= 'red', width = 24.6, height= 30}) => {
  return (
    // its a SVG example, it`s by half, or corrupted, to not occupy large caracter space here, use your SVG file here...
    <svg width={width} height={height} viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z" fill={fill} />
      <path fill="#FFF" d="M 18.606 19.589 C 16.021 19.589 14.406 17.045 15.698 15.007 C 16.991 12.972 20.224 12.972 21.517 15.007 C 21.811 15.472 21.966 16 21.966 16.534 C 21.966 18.222 20.462 19.589 18.606 19.589 Z M 18.606 15.007 C 17.314 15.007 16.507 16.28 17.153 17.297 C 17.799 18.316 19.415 18.316 20.061 17.297 C 20.209 17.065 20.288 16.804 20.288 16.534 C 20.288 15.692 19.537 15.007 18.606 15.007 Z" />
      <path fill="#FFF" d="M 6.85 19.589 C 4.267 19.589 2.647 17.045 3.942 15.007 C 5.233 12.972 8.467 12.972 9.758 15.007 C 10.054 15.472 10.209 16 10.209 16.534 C 10.209 18.222 8.705 19.589 6.85 19.589 Z M 6.85 15.007 C 5.556 15.007 4.751 16.28 5.396 17.297 C 6.043 18.316 7.659 18.316 8.305 17.297 C 8.451 17.065 8.531 16.804 8.531 16.534 C 8.531 15.692 7.779 15.007 6.85 15.007 Z" />
      <path fill="#FFF" stroke="none" d="M 12.728 17.297 L 7.691 17.297 C 7.043 17.297 6.638 16.662 6.965 16.152 C 7.113 15.916 7.392 15.772 7.691 15.772 L 12.728 15.772 C 13.375 15.772 13.778 16.408 13.456 16.916 C 13.304 17.154 13.028 17.297 12.728 17.297 Z" />
      <path fill="#FFF" stroke="none" d="M 13.567 15.007 L 11.889 15.007 C 11.664 15.008 11.451 14.928 11.292 14.787 L 8.185 11.954 L 6.011 11.954 C 5.786 11.955 5.574 11.875 5.416 11.733 L 4.575 10.969 C 4.115 10.551 4.326 9.839 4.953 9.687 C 5.244 9.617 5.554 9.694 5.768 9.885 L 6.357 10.428 L 8.531 10.428 C 8.754 10.428 8.967 10.506 9.127 10.649 L 12.233 13.482 L 13.258 13.482 L 15.963 11.375 C 16.114 11.256 16.307 11.19 16.508 11.19 L 19.101 11.19 C 19.29 11.186 19.444 11.05 19.447 10.879 C 19.449 10.795 19.412 10.709 19.345 10.649 L 15.492 7.153 C 15.032 6.734 15.243 6.022 15.869 5.871 C 16.162 5.799 16.471 5.875 16.684 6.068 L 20.529 9.573 C 20.915 9.915 21.13 10.388 21.125 10.879 C 21.125 11.895 20.221 12.718 19.101 12.718 L 16.818 12.718 L 14.114 14.826 C 13.96 14.943 13.769 15.007 13.567 15.007 Z" />
      <path fill="#FFF" stroke="none" d="M 11.889 11.954 L 6.011 11.954 C 5.364 11.954 4.961 11.317 5.283 10.809 C 5.434 10.573 5.71 10.428 6.011 10.428 L 11.545 10.428 L 12.973 9.122 C 13.132 8.98 13.344 8.9 13.567 8.902 L 15.249 8.902 C 15.894 8.902 16.299 9.537 15.976 10.046 C 15.824 10.282 15.547 10.428 15.249 10.428 L 13.912 10.428 L 12.485 11.733 C 12.326 11.875 12.112 11.955 11.889 11.954 Z" />
      <path fill="#FFF" stroke="none" d="M 17.768 8.137 L 17.768 11.954 L 19.101 11.954 C 20.013 11.957 20.588 11.063 20.136 10.342 C 20.082 10.258 20.017 10.183 19.942 10.114 Z" /> 
    </svg>
  );
});
export default IconMotorcycle;