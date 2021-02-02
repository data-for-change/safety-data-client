import React from 'react';
import { Bar, HorizontalBar, Pie } from 'react-chartjs-2';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: readonly any[];
  chartType?: string;
  fill?: string;
}
const ChartBar: React.FC<IProps> = observer(({ data, chartType = 'BarChart', fill = '#8884d8' }: IProps) => {
  const { t } = useTranslation();
  const labels = data.map((x) => x._id);
  const vals = data.map((x) => x.count);
  const label = t('casualties');
  const data3 = {
    labels,
    datasets: [
      {
        label,
        backgroundColor: fill,
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: vals,
      },
    ],
  };
  const options1 = {
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
        height={320}
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
export default ChartBar;
