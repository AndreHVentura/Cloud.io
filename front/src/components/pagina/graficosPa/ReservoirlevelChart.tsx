import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ChartTitle } from '../graphicsmodel';


type DataPoint = {
  x: string;
  y: number;
};

const ReservoirLevelChart: React.FC = () => {
  const series = [
    {
      name: 'Actual',
      data: [
        { x: '2011', y: 1292 },
  { x: '2012', y: 4432 },
  { x: '2013', y: 5423 },
  { x: '2014', y: 6653 },
  { x: '2015', y: 8133 },
  { x: '2016', y: 7132 },
  { x: '2017', y: 7332 },
  { x: '2018', y: 6553 },
  { x: '2019', y: 7120 },
  { x: '2020', y: 7420 },
  { x: '2021', y: 8065 },
  { x: '2022', y: 6582 },
  { x: '2023', y: 5731 },
  { x: '2024', y: 7630 },
  { x: '2025', y: 7121 },
  { x: '2026', y: 6500 },
  { x: '2027', y: 8250 },
  { x: '2028', y: 7350 }
      ] as DataPoint[]
    }
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    tooltip: {
      enabled: true,
      shared: false, // ← alterado aqui
      intersect: false,
      y: {
        formatter: (val: number) => `${val} litros`
      },
      theme: 'dark'
    },
    plotOptions: {
      bar: {
        columnWidth: '60%'
      }
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#535353']
      }
    },
    yaxis: {
      min: 0,
      max: 8500 // ← garante escala adequada para visualização das barras pequenas
    },
    legend: {
      show: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#00E396', '#775DD0']
      }
    },
    annotations: {
      yaxis: [
        {
          y: 7000,
          borderColor: '#775DD0',
          label: {
            borderColor: '#775DD0',
            style: {
              color: '#fff',
              background: '#775DD0'
            },
            text: 'Expected'
          }
        }
      ]
    }
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={400} width={650} />
    </div>
  );
};

export default ReservoirLevelChart;
