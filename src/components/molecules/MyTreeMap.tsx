// @ts-nocheck
import React, { memo } from 'react';
import { Treemap } from 'recharts';
import { observer } from 'mobx-react';

const data1 = [
  {
    name: 'axis',
    children: [
      { name: 'Axes', size: 1302 },
      { name: 'Axis', size: 24593 },
      { name: 'AxisGridLine', size: 652 },
      { name: 'AxisLabel', size: 636 },
      { name: 'CartesianAxes', size: 6703 },
    ],
  },
  {
    name: 'controls',
    children: [
      { name: 'AnchorControl', size: 2138 },
      { name: 'ClickControl', size: 3824 },
      { name: 'Control', size: 1353 },
      { name: 'ControlList', size: 4665 },
      { name: 'DragControl', size: 2649 },
      { name: 'ExpandControl', size: 2832 },
      { name: 'HoverControl', size: 4896 },
      { name: 'IControl', size: 763 },
      { name: 'PanZoomControl', size: 5222 },
      { name: 'SelectionControl', size: 7862 },
      { name: 'TooltipControl', size: 8435 },
    ],
  },
];

interface IProps {
    data: readonly any[];
    barsData?: any;
    width?: number;
    height?: number;
    fill?: string;
}

const MyTreeMap: React.FC<IProps> = observer(({
  data, width = 390, height = 250, fill = '#8884d8',
}) => {
  const data2 = data.map((x) => ({ name: x._id, count: x.count }));
  return (
    <div style={{ direction: 'ltr' }}>
      <Treemap
        width={width}
        height={height}
        data={data2}
        dataKey="count"
        // nameKey="_id"
        ratio={4 / 3}
        stroke="#fff"
        fill={fill}
      />
    </div>
  );
});
export default memo(MyTreeMap);
