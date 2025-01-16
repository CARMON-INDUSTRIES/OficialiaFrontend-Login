import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const data = {
  datasets: [
    {
      data: [12, 19, 5],
      backgroundColor: [
        '#98D89E',
        '#E9A0A0',
        '#F6DC7D'
      ],
      borderColor: [
        '#98D89E',
        '#E9A0A0',
        '#F6DC7D'
      ]
    },
  ],
};

const DoughnutChart = () => {
  return (
    <Doughnut data={data} />
  )
}

export default DoughnutChart