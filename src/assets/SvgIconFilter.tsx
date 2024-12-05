import React from "react"

function SvgIconFilter(props: React.SVGProps<SVGSVGElement>) {
  const color = (props.color) ? props.color : 'blue';
  const height = (props.height) ? props.height : 24;
  const width = (props.width) ? props.width : 24;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
    >
      <path d="M0 0h24m0 24H0" fill="none" />
      <path d="M7 6h10l-5.01 6.3L7 6zm-2.75-.39C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0018.95 4H5.04c-.83 0-1.3.95-.79 1.61z" 
       fill={color} />
      <path d="M0 0h24v24H0V0z" fill="none" />
    </svg>
  )
}

export default React.memo(SvgIconFilter);