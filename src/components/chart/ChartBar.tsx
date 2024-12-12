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
  Legend
);

export const options = {
  responsive: true,
  indexAxis: "x" as "x" | "y",
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const ChartBar: React.FC<IProps> = ({ data, metaData, chartType = 'BarChart', height = 60, dir, fill = '#8884d8', }: IProps) => {
  const { t } = useTranslation();
  // if metaData == undefined - chart of 1 group
  //if (metaData == undefined) {
  const label = t('casualties');
  const backgroundColor = getColorPallete(chartType, data.length, fill);
  //}
  // Extract labels and data
  const labels = data.map(item => item._id);

  // Create the chart data structure
  let datasets: any;
  if (metaData === undefined) {
    // chart of gorup 1
    const counts = data.map(item => item.count);
    datasets = [
      {
        label: label,
        data: counts,
        backgroundColor: backgroundColor
      },
    ];
  } else {
    // Dynamically generate datasets based on MethData and data
    datasets = metaData.map((method) => {
      return {
        label: t(method.key), //method.key.charAt(0).toUpperCase() + method.key.slice(1),  
        data: data.map(item => item[method.key] || 0),  // Use key from MethData to access values in data
        backgroundColor: method.color, // backgroundColor from MethData
        axis: 'x',
      };
    });
  }
  const chartData = {
    labels: labels, // Years as labels
    datasets: datasets
  };
  if (chartType === 'BarChart') {    
    return (
      <>
        <Bar options={options} data={chartData} />
      </>
    );
  } else if (chartType === 'PieChart') {       
    return (
      <>
        <Pie options={options} data={chartData} />
      </>
    );
  } else { 
    //HorizontalBar
    //options.indexAxis= "y" as "y";
    const options1 = ({indexAxis: "y" as "y"})
    // chartData.datasets = chartData.datasets.map((dataset: any) => ({
    //   ...dataset,
    //   axis: "y",
    // }));
    return (
      <>
        <Bar options={options1} data={chartData} />
      </>
    );
  }
}
export default ChartBar;
