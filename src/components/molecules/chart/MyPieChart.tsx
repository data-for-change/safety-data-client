import React, { memo } from 'react';
import {
  PieChart, Pie, Tooltip, PieLabelRenderProps,
} from 'recharts';
import { observer } from 'mobx-react';
// import { useTranslation } from 'react-i18next';
import { useStore } from '../../stores/storeConfig';

// const data = [
//   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400,},
//   { name: 'Page B', uv: 3000, pv: 1398, amt: 2210,},
//   { name: 'Page C', uv: 2000, pv: 9800, amt: 2290,},
// ];

interface IProps {
    data: readonly any[]
    barsData?: any
    width?: number
    fill?: string,
    legendType?: string
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, name,
  fcx = (cx === undefined) ? 0 : +cx,
  fcy = (cy === undefined) ? 0 : +cy,
  inR = (innerRadius === undefined) ? 1 : +innerRadius,
  outR = (outerRadius === undefined) ? 1 : +outerRadius,
  midA = (midAngle === undefined) ? 1 : +midAngle,
  p = (percent === undefined) ? 1 : +percent,
} : PieLabelRenderProps) => {
  const radius = inR + (outR - inR) * 0.7;
  const x = fcx + radius * Math.cos(-midA * RADIAN);
  const y = fcy + radius * Math.sin(-midA * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > fcx ? 'start' : 'end'} dominantBaseline="central">
      {`${(p * 100).toFixed(0)}%`}
    </text>
  );
};

const MyPieChart: React.FC<IProps> = observer(({
  data, width = 390, fill = '#8884d8',
}) => {
  const { uiStore } = useStore();
  const { showPercentageChart } = uiStore;
  //   const colName = t('casualties');
  //   const bottomMargin = isManyBarsForXAxis ? 75 : 15;
  //   const legend = (legendType === 'null' || width < 500) ? null
  //     : <Legend layout="horizontal" verticalAlign="top" align="center" />;
  const mylabel = (showPercentageChart) ? renderCustomizedLabel : true;
  return (
    <div style={{ direction: 'ltr' }}>
      <PieChart width={width} height={width}>
        <Pie
          dataKey="count"
          nameKey="_id"
          isAnimationActive={false}
          data={data}
          cx={200}
          cy={200}
          fill={fill}
          labelLine={!showPercentageChart}
          label={mylabel}
          // label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
});
export default memo(MyPieChart);
