import React from 'react';
import { Bar, HorizontalBar, Pie } from 'react-chartjs-2';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: readonly any[];
  metaData: any[];
  chartType?: string;
}

const ChartGroupBy2: React.FC<IProps> = observer(({ data, metaData, chartType = 'BarChart' }: IProps) => {
  const { t } = useTranslation();
  const labels = data.map((x) => x._id);
  const datasets1 = metaData.map((x: any) => {
    const name = t(x.key);
    const fill = x.color;
    const vals = data.map((row) => row[x.key]);
    return {
      label: name,
      backgroundColor: fill,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: vals,
    };
  });
  const data3 = {
    labels,
    datasets: datasets1,
  };
  const options1 = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      }],
    },
  };
  if (chartType === 'BarChart') {
    return (
      <Bar
        data={data3}
        // height={150}
        options={options1}
      />
    );
  }
  if (chartType === 'HorizontalBar') {
    return (
      <HorizontalBar
        data={data3}
      />
    );
  }
  return (
    <Pie
      data={data3}
      height={220}
    />
  );
});


export default ChartGroupBy2;
