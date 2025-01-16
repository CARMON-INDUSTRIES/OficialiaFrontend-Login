import React from 'react';
// import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  //   Title,
  Tooltip,
  //   Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  //   Title,
  Tooltip
  //   Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const labels = ['Week1', 'Week2', 'Week3', 'week4'];

const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: '#98D89E',
    },
    {
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: '#E9A0A0',
    },
  ],
};

const BarChart = () => {
  return (
    <div className='w-full h-80 pt-4 pb-8'>
      <Bar options={options} data={data} />;
    </div>
  );
};

export default BarChart;
