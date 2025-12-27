import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTranslation } from 'react-i18next';

// import { useTranslation } from 'react-i18next';
// import { Bar, Pie } from 'react-chartjs-2';
// import 'chartjs-plugin-datalabels';

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

// const ChartBar: React.FC<IProps> = ({ data, metaData, chartType = 'BarChart', height = 60, dir, fill = '#8884d8', }: IProps) => {
//   const { t } = useTranslation();
//   let dataChart;
//   // if metaData == undefined - chart of 1 group
//   if (metaData == undefined) {
//     const labels = data.map((x) => x._id);
//     const vals = data.map((x) => x.count);
//     const label = t('casualties');
//     const backgroundColor = getColorPallete(chartType, data.length, fill);
//     dataChart = {
//       labels,
//       datasets: [
//         {
//           label,
//           backgroundColor: backgroundColor,
//           borderColor: 'rgba(255,255,255,0.7)',
//           borderWidth: 1,
//           // hoverBackgroundColor: 0.7,
//           hoverBorderColor: 'rgba(255,99,132,1)',
//           data: vals,
//         },
//       ],
//     };
//   }
//   else {
//     const labels = data.map((x) => x._id);
//     const datasets1 = metaData.map((x: any) => {
//       const name = t(x.key);
//       const fill = x.color;
//       const vals = data.map((row) => row[x.key]);
//       return {
//         label: name,
//         backgroundColor: fill,
//         hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//         hoverBorderColor: 'rgba(255,99,132,1)',
//         data: vals,
//       };
//     });
//     dataChart = {
//       labels,
//       datasets: datasets1,
//     };
//   };
//   let align = (dir === 'rtl') ? '-40' : 'end';
//   const options1 = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true,
//           min: 0,
//         },
//       }],
//     },
//     plugins: {
//       datalabels: {
//         display: true,
//         align: align,
//         anchor: "end",
//         font: { size: "14" }

//       }
//     },
//     legend: {
//       display: true
//     }
//   };
//   if (chartType === 'BarChart') {
//     return (
//       <Bar
//         data={dataChart}
//         //height={height}
//         //options={options1}
//       />
//     );
//   }
//   if (chartType === 'HorizontalBar') {
//     const offset = (dir === 'rtl') ? 20 : 4;
//     return (
//       <h1>HorizontalBarChart</h1>
//       // <HorizontalBarChart
//       //   data={dataChart}
//       //   options={
//       //     {
//       //       responsive: true,
//       //       maintainAspectRatio: false,
//       //       plugins: {
//       //         datalabels: {
//       //           display: true,
//       //           anchor: "end",
//       //           align: 'end',
//       //           offset : offset,
//       //           font: { size: "14" }
//       //         }
//       //       }
//       //     }}
//       // />
//     );
//   }
//   return (
//     <Pie
//       data={dataChart}
//       options={{
//         responsive: true,
//         // plugins: {
//         //   datalabels: {
//         //     display: true,
//         //     color: 'white',
//         //     align: align
//         //   }
//         // }
//       }}
//     />
//   );
// };

// const options = {
//   indexAxis: 'y', // This makes it a horizontal bar chart
//   scales: {
//     x: {
//       beginAtZero: true,
//     },
//   },
// };

// interface IPropsHorizontalBar {
//   data: readonly any[];
//   //options1: any;
// }
// // const HorizontalBarChart: React.FC<IPropsHorizontalBar> = ({ data}: IProps) =>{
// //   return <Bar data={data}  />;
// // };

// export default ChartBar;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);


export const datalabelsOptions=  {
  anchor: 'end', // Label position relative to the bar
  align: 'top', // Alignment of the label
  textAlign: "center",
  font: {
    size: 12, // Font size
    weight: 'bold', // Font weight
  }
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "x" as "x" | "y",
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const ChartBar: React.FC<IProps> = ({ data, metaData, chartType = 'BarChart', height = 60, dir, fill = '#8884d8', }: IProps) => {
  const { t } = useTranslation();

  // Separate visible items from the aggregated outside item
  const outsideItem = data.find(item => item._id === 'outside_range');
  const visibleItems = data.filter(item => item._id !== 'outside_range');

  // Construct shared labels
  const labels = visibleItems.map(item => item._id);
  if (outsideItem) {
    labels.push(t('outside_range'));
  }

  const labelPrefix = t('casualties');
  const isBar = chartType === 'BarChart' || chartType === 'HorizontalBar';
  const backgroundColor = getColorPallete(chartType, visibleItems.length, fill);

  let chartDatasets: any[] = [];

  if (metaData === undefined) {
    // Single Dataset Chart (Category only)
    const backgroundColor = getColorPallete(chartType, visibleItems.length, fill);

    // Main Dataset
    chartDatasets.push({
      label: labelPrefix,
      data: [...visibleItems.map(item => item.count), outsideItem ? null : undefined].filter(x => x !== undefined),
      backgroundColor: backgroundColor,
    });

    // Outside Dataset (Only for Bar charts)
    if (outsideItem && isBar) {
      chartDatasets.push({
        label: t('outside_range'),
        data: [...Array(visibleItems.length).fill(null), outsideItem.count],
        backgroundColor: '#FF4136',
        // borderRadius: 4,
      });
    }
  } else {
    // Grouped/Multi-Dataset Chart (e.g. Gender, Age)
    // 1. Visible datasets
    metaData.forEach((method) => {
      chartDatasets.push({
        label: t(method.key),
        data: [...visibleItems.map(item => item[method.key] || 0), outsideItem ? null : undefined].filter(x => x !== undefined),
        backgroundColor: method.color,
        axis: 'x',
      });
    });

    // 2. Summary Outside Dataset (Single combined bar for all groups)
    if (outsideItem && isBar) {
      // Calculate total for the specific outside candle
      const totalOutside = metaData.reduce((sum, method) => sum + (outsideItem[method.key] || 0), 0);
      chartDatasets.push({
        label: `${t('outside_range')}`,
        data: [...Array(visibleItems.length).fill(null), totalOutside],
        backgroundColor: '#FF4136',
        // borderRadius: 4,
        // barPercentage: 0.5, // Make it look more like a "candle"
      });
    }
  }

  const chartData = {
    labels: labels,
    datasets: chartDatasets
  };

  if (chartType === 'BarChart') {
    Object.assign(options.plugins, { datalabels: datalabelsOptions });
    return (
      <div style={{ height: '100%'}}>
        <Bar options={options} data={chartData} />
      </div>
    );
  } else if (chartType === 'PieChart') {
    // For Pie charts, we keep one dataset with all slices (including outside)
    // because multiple datasets in Pie/Pie results in multi-level doughnuts.
    const pieData = {
      labels: labels,
      datasets: [{
        data: data.map(item => item.count || metaData?.reduce((s: number, m: any) => s + (item[m.key] || 0), 0)),
        backgroundColor: data.map((item, index) => {
          if (item._id === 'outside_range') return '#FF4136';
          if (metaData) return 'grey'; // Fixed color for grouped data in pie
          return Array.isArray(backgroundColor) ? backgroundColor[index % backgroundColor.length] : backgroundColor;
        })
      }]
    };
    return (
      <>
        <Pie options={options} data={pieData} />
      </>
    );
  } else {
    // HorizontalBar
    const options1 = ({indexAxis: "y" as "y"});
    return (
      <div >
        <Bar options={options1} data={chartData} />
      </div>
    );
  }
}
export default ChartBar;
