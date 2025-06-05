import React from 'react';
import ApexCharts from 'react-apexcharts';

const WaveHeightChart = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false }
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      categories: [
        "2025-04-11T00:00:00.000Z",
        "2025-04-11T01:00:00.000Z",
        "2025-04-11T02:00:00.000Z",
        "2025-04-11T03:00:00.000Z",
        "2025-04-11T04:00:00.000Z"
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  };

  const series = [
    {
      name: 'Altura de ondulção do rio',
      data: [45, 50, 47, 52, 55]
    },
    {
      name: 'Média de ondulação',
      data: [30, 35, 33, 36, 38]
    }
  ];

  return <ApexCharts options={options} series={series} type="area" height={300} width={650} />;
};

export default WaveHeightChart;