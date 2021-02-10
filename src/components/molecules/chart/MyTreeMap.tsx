// @ts-nocheck
import React, { memo } from 'react';
import { Treemap } from 'recharts';
import { observer } from 'mobx-react';

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
