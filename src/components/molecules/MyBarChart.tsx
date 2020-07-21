import React, { memo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList,
} from 'recharts';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

// const data = [
//   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400,},
//   { name: 'Page B', uv: 3000, pv: 1398, amt: 2210,},
//   { name: 'Page C', uv: 2000, pv: 9800, amt: 2290,},
// ];

interface IProps {
  data :readonly any[]
  barsData ?: any
  width? : number
  height? : number,
  fill? : string,
  legendType? : string
}

const MyBarChart:React.FC<IProps> = observer(({
  data, barsData, width = 390, height = 350, fill = '#8884d8', legendType = 'null',
}) => {
  const { t } = useTranslation();
  const colName = t('casualties');
  const maxLabelLangth = data.reduce((maxval, currentValue) => (
    (currentValue._id !== null && currentValue._id.length > maxval) ? currentValue._id.length : maxval), 0);
  const isManyBarsForXAxis = (data.length > 5 || maxLabelLangth > 9);
  const isManyBarsForLables = (data.length > 30);
  const myFormater = (label :string | number) => {
    if (typeof label === 'number' && !Number.isInteger(label)) {
      return label.toFixed(1);
    }
    return label;
  };

  let bars = null;
  if (barsData === undefined) {
    // in regular charts
    bars = (
      <Bar dataKey="count" name={colName} fill={fill}>
        <LabelList
          dataKey="count"
          position="top"
          formatter={myFormater}
        />
      </Bar>
    );
  } else {
    // in charts for 2 groups
    bars = barsData.map((x:any) => {
      const aName = t(x.key);
      const labelList = (isManyBarsForLables) ? null : <LabelList dataKey={x.key} position="top" />;
      return (<Bar key={`bar-${x.key}`} dataKey={x.key} name={aName} fill={x.color}>{labelList}</Bar>);
    });
  }
  const xAxis = isManyBarsForXAxis ? (
    <XAxis
      dataKey="_id"
      textAnchor="end"
      interval={0}
      angle={-30}
      tick={{ fontSize: 12 }}
    />
  ) : <XAxis dataKey="_id" />;
  const bottomMargin = isManyBarsForXAxis ? 75 : 15;
  const legend = (legendType === 'null' || width < 500) ? null
    : <Legend layout="horizontal" verticalAlign="top" align="center" />;
  return (
    <div style={{ direction: 'ltr' }}>
      <BarChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 30, right: 2, left: 2, bottom: bottomMargin,
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
});
export default memo(MyBarChart);
