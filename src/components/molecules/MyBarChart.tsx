import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'

import { useTranslation } from 'react-i18next';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
];

interface IProps {
}

const MyBarChart:React.FC<IProps>=  observer(() => {
  const { t } = useTranslation();
  const store = useStore();
  let reactData1 = toJS(store.dataByYears)
  let colName = t('Casualties')
  return (
    <BarChart
      width={500}
      height={300}
      data={reactData1}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
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
