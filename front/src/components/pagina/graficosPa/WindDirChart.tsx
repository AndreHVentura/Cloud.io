import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const WindDirChart: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [windDirInstRaw, setWindDirInstRaw] = useState<number[]>([]);
  const [windDirAvgRaw, setWindDirAvgRaw] = useState<number[]>([]);
  const initialDate = '2025-06-14'

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`http://localhost:5000/api/sensors/by-day/${initialDate}`);
        const result = await res.json();

        const windDirInstRawArr = result.data.map((e: { wind_dir_rt: number }) => e.wind_dir_rt);
        setWindDirInstRaw(windDirInstRawArr);

        const windDirAvgRawArr = result.data.map((e: { wind_dir_avg: number }) => e.wind_dir_avg);
        setWindDirAvgRaw(windDirAvgRawArr);

      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setLoading(false);
      }

    }

    loadData();
  }, [initialDate]);

  // Função para mapear graus para setor cardinal
  const mapDegreeToSector = (deg: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  // Dados brutos (valores de graus)
  /*const windDirInstRaw = [
    204, 108, 184, 264, 297, 356, 4, 341, 340, 2, 315, 293, 309, 298, 356, 313, 358, 328, 332, 0,
    358, 6, 0, 2, 355, 1, 1, 6, 341, 41, 357, 336, 0, 359, 1, 358, 358, 1, 47, 358, 352, 359, 357, 315,
    17, 31, 277, 279, 212, 287
  ];

  const windDirAvgRaw = [
    183, 137, 129, 266, 309, 266, 223, 296, 271, 295, 300, 296, 295, 300, 162, 265, 207, 282, 76, 191,
    222, 121, 222, 258, 206, 247, 268, 121, 304, 280, 340, 237, 120, 208, 263, 193, 236, 122, 97, 131,
    302, 251, 315, 220, 136, 187, 274, 293, 240, 215
  ];*/

  // Mapeando direções para os setores
  const windDirInst = windDirInstRaw.map(mapDegreeToSector);
  const windDirAvg = windDirAvgRaw.map(mapDegreeToSector);

  // Categorias fixas para o gráfico
  const categories = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];

  // Função para contar ocorrência por setor
  const countDirections = (data: string[]) => {
    return categories.map(cat =>
      data.filter(dir => dir === cat).length
    );
  };

  const series = [
    {
      name: 'Direção instantânea do Vento',
      data: countDirections(windDirInst)
    },
    {
      name: 'Direção média do vento',
      data: countDirections(windDirAvg)
    }
  ];

  const options: ApexOptions = {
    chart: {
      type: 'radar',
      height: 350,
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      },
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 3
    },
    xaxis: {
      categories
    },
    tooltip: {
      theme: 'dark'
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="radar" height={400} width={650} />
    </div>
  );
};

export default WindDirChart;
