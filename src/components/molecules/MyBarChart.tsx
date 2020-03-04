import React from 'react';
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
  data :ReadonlyArray<object>
  width? : number
  height? : number
}

const MyBarChart:React.FC<IProps>=  observer(({data, width=400, height=250}) => {
  const { t } = useTranslation();
  let colName = t('Casualties')
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5, right: 5, left: 5, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" name={colName} fill="#8884d8" />
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
  );
})

export default MyBarChart
