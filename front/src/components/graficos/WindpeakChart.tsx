'use client'
import { use } from 'react'
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

async function fetchSensorData(date: any){
  const responde = await fetch(`http://localhost:5000/api/sensors/by-day/${date}`)
  if(!responde.ok){
    throw new Error('Falha ao buscar dados do sensores')
  }
  return responde.json()
}


const WindPeakChart = () => {

  const sensorData = use(fetchSensorData('2025-06-14'))

  // Dados reais convertidos de string para número
  const windPeakData = [
    "1,44", "0,40", "0,74", "1,87", "3,26", "3,44", "3,20", "1,73", "1,80", "2,23",
    "2,17", "3,36", "2,44", "2,75", "1,87", "1,41", "1,61", "2,46", "1,70", "1,44",
    "2,38", "1,62", "2,33", "1,12", "1,75", "1,49", "2,13", "1,53", "0,72", "0,81",
    "1,99", "1,63", "1,91", "1,57", "1,05", "2,74", "2,73", "1,72", "1,27", "1,19",
    "2,11", "2,65", "2,33", "1,20", "1,39", "1,06", "0,66", "1,20", "0,94", "0,63"
  ].map((val) => parseFloat(val.replace(',', '.')));

  // Combinar Data + Hora e transformar em timestamps ISO
  const date = "2024-09-01";
  const times = [
    "00:00","00:10","00:20","00:30","00:40","00:50","01:00","01:10","01:20","01:30",
    "01:40","01:50","02:00","02:10","02:20","02:30","02:40","02:50","03:00","03:10",
    "03:20","03:30","03:40","03:50","04:00","04:10","04:20","04:30","04:40","04:50",
    "05:00","05:10","05:20","05:30","05:40","05:50","06:00","06:10","06:20","06:30",
    "06:40","06:50","07:00","07:10","07:20","07:30","07:40","07:50","08:00","08:10"
  ];
  const timestamps = times.map((time) => new Date(`${date}T${time}:00Z`).toISOString());



  const options: ApexOptions = {
    
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      itemMargin: {
        horizontal: 10,
        vertical: 0
      }
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      categories: timestamps
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  };

  const series = [
    {
      name: 'Pico de Vento (m/s)',
      data: windPeakData
    }
  ];

  return <ApexCharts options={options} series={series} type="area" height={300} width={650} />;
};

export default WindPeakChart;