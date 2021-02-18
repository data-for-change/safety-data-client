import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, HorizontalBar, Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

interface IProps {
  data: readonly any[];
  metaData?: any[];
  chartType?: string;
  height?: number;
  fill?: string;
  dir: string;
}

const getColorPallete = (chartType: string, length: number, defColor: string) => {
  let res;
  if (chartType === 'PieChart') {
    if (length < 3)
      res = ['#031E47', '#6791B2']
    else if (length < 6)
      res = ['#031E47', '#24446B', '#466B8F', '#6791B2', '#88B7D6']
    else {
      res = ['#031E47', '#19385F', '#2F5177', '#466B8F', '#5C84A6', '#729EBE', '#88B7D6',
        '#07681F', '#2D7B2C', '#538E39', '#7AA146', '#A0B352', '#C6C65F', '#ECD96C',
        '#540455', '#671E6A', '#7A377F', '#8D5194', '#A06BA9', '#B384BE', '#C69ED3'
      ];
    }
  }
  else {
    res = defColor;
  }
  return res;
};

const ChartBar: React.FC<IProps> = ({ data, metaData, chartType = 'BarChart', height = 60, dir, fill = '#8884d8', }: IProps) => {
  const { t } = useTranslation();
  let dataChart;
  // if metaData == undefined - chart of 1 group
  if (metaData == undefined) {
    const labels = data.map((x) => x._id);
    const vals = data.map((x) => x.count);
    const label = t('casualties');
    const backgroundColor = getColorPallete(chartType, data.length, fill);
    dataChart = {
      labels,
      datasets: [
        {
          label,
          backgroundColor: backgroundColor,
          borderColor: 'rgba(255,255,255,0.7)',
          borderWidth: 1,
          // hoverBackgroundColor: 0.7,
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: vals,
        },
      ],
    };
  }
  else {
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
    dataChart = {
      labels,
      datasets: datasets1,
    };
  };
  const align = (dir === 'rtl') ? 'right' : 'center';
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
    plugins: {
      datalabels: {
        display: true,
        color: 'white',
        align: align
      }
    }
  };
  if (chartType === 'BarChart') {
    return (
      <Bar
        data={dataChart}
        //height={height}
        options={options1}
      />
    );
  }
  if (chartType === 'HorizontalBar') {
    return (
      <HorizontalBar
        data={dataChart}
        options={
          {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                display: true,
                color: 'white',
                align: align
              }
            }
          }}
      />
    );
  }
  return (
    <Pie
      data={dataChart}
      options={{
        responsive: true,
        plugins: {
          datalabels: {
            display: true,
            color: 'white',
            align: align
          }
        }
      }}
    />
  );
};
export default ChartBar;
