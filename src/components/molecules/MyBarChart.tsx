import React, {memo} from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { observer } from "mobx-react"
import { useTranslation } from 'react-i18next';

// const data = [
//   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400,},
//   { name: 'Page B', uv: 3000, pv: 1398, amt: 2210,},
//   { name: 'Page C', uv: 2000, pv: 9800, amt: 2290,},
// ];

interface IProps {
  data :readonly any[]
  bars ?: any 
  width? : number
  height? : number,
  fill? : string, 
  legendType? : string
}

const MyBarChart:React.FC<IProps>=  observer(({data,bars, width=390, height=350, fill="#8884d8",legendType="null"}) => {
  const { t } = useTranslation();
  let colName = t('Casualties');
  if (bars === undefined){
    bars = <Bar dataKey="count" name={colName} fill={fill} />
  }
  else
  {
    bars = bars.map((x:any)=>{
      let aName = t(x.key)
      return(<Bar key={`bar-${x.key}`} dataKey={x.key} name={aName} fill={x.color}/>)
    })
  }
  const maxLabelLangth = data.reduce(function(maxval,currentValue){
    return (currentValue._id !== null && currentValue._id.length > maxval)? currentValue._id.length:maxval;
  },0);
  const xAxis = (data.length >5 || maxLabelLangth>9)? <XAxis dataKey="_id" textAnchor="end" interval={0} angle={-30} tick={{fontSize: 12}} />: <XAxis dataKey="_id"/>
  const legend = (legendType === "null" || width < 500) ? null :  <Legend layout="horizontal" verticalAlign="top" align="center"/>
  return (
    <div style={{direction: "ltr"}}>
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5, right: 0, left: 0, bottom: 75,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {xAxis}
      <YAxis />
      <Tooltip />
      {legend}
      {bars}
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
    </div>
  );
})

export default memo(MyBarChart)
