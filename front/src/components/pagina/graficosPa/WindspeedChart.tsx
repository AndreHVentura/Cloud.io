import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const WindspeedChart = () => {
  const [loading, setLoading] = useState(true);
  const [windSpeedInst, setWindSpeedInst] = useState<number[]>([]);
  const [windSpeedAvg, setWindSpeedAvg] = useState<number[]>([]);
  const [timestamps, seTimestamps] = useState<string[]>([]);
  const initialDate = '2025-06-14'

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`http://localhost:5000/api/sensors/by-day/${initialDate}`);
        const result = await res.json();

        const windSpeedInstArr = result.data.map((e: { wind_rt: number }) => e.wind_rt);
        setWindSpeedInst(windSpeedInstArr);

        const windSpeedAvgtArr = result.data.map((e: { wind_avg: number }) => e.wind_avg);
        setWindSpeedAvg(windSpeedAvgtArr);

        const timestampsArr = result.data.map((e: { reading_time: string }) => e.reading_time);
        seTimestamps(timestampsArr);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setLoading(false);
      }

    }

    loadData();
  }, [initialDate]);


  /*const windSpeedInst = [
    "1,18","0,26","0,47","1,82","1,77","1,29","1,67","1,12","0,23","0,51",
    "1,67","2,89","1,87","2,12","1,30","1,32","1,29","0,40","0,71","0,95",
    "1,67","1,28","1,45","0,62","1,51","1,48","1,57","1,25","0,24","0,22",
    "1,20","0,31","1,59","1,21","0,68","2,11","1,69","1,66","0,69","1,04",
    "1,15","1,54","1,48","0,53","0,47","0,67","0,39","1,15","0,56","0,20"
  ].map(v => parseFloat(v.replace(",", ".")));*/

  /*const windSpeedAvg = [
    "1,18","0,22","0,45","1,47","2,50","1,90","2,08","1,06","1,14","1,08",
    "1,21","2,93","1,73","2,45","1,20","0,71","1,17","1,25","1,24","1,09",
    "1,76","1,32","1,64","0,52","1,38","0,88","1,58","1,29","0,50","0,41",
    "1,49","1,14","1,68","1,25","0,57","2,28","1,92","1,38","0,60","0,85",
    "1,21","2,01","1,16","0,69","0,78","0,55","0,42","0,49","0,58","0,39"
  ].map(v => parseFloat(v.replace(",", ".")));*/

  /*const timestamps = [
    "00:00","00:10","00:20","00:30","00:40","00:50","01:00","01:10","01:20","01:30",
    "01:40","01:50","02:00","02:10","02:20","02:30","02:40","02:50","03:00","03:10",
    "03:20","03:30","03:40","03:50","04:00","04:10","04:20","04:30","04:40","04:50",
    "05:00","05:10","05:20","05:30","05:40","05:50","06:00","06:10","06:20","06:30",
    "06:40","06:50","07:00","07:10","07:20","07:30","07:40","07:50","08:00","08:10"
  ].map(t => new Date(`2024-09-01T${t}:00Z`).toISOString());*/

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
      categories: timestamps
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
      theme: 'dark'
    }
  };

  const series = [
    {
      name: 'Velocidade instantânea do Vento',
      data: windSpeedInst
    },
    {
      name: 'Média de Velocidade do vento',
      data: windSpeedAvg
    }
  ];

  return <ApexCharts options={options} series={series} type="area" height={400} width={650} />;
};

export default WindspeedChart;
