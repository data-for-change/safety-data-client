import React, { memo } from 'react';
import {
  PieChart, Pie, Tooltip,
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
  fill? : string,
  legendType? : string
}

const MyPieChart:React.FC<IProps> = observer(({
  data, barsData, width = 390, fill = '#8884d8', legendType = 'null',
}) => {
  const { t } = useTranslation();
  //   const colName = t('casualties');
  //   const bottomMargin = isManyBarsForXAxis ? 75 : 15;
  //   const legend = (legendType === 'null' || width < 500) ? null
  //     : <Legend layout="horizontal" verticalAlign="top" align="center" />;
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
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
});
export default memo(MyPieChart);
