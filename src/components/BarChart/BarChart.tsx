import React from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';

const DemoBar = () => {
  const data = [
    {
      year: '2022',
      created: 50,
      ongoing: 30,
      completed: 20,
    },
    {
      year: '2023',
      created: 70,
      ongoing: 40,
      completed: 30,
    },
    {
      year: '2024',
      created: 90,
      ongoing: 50,
      completed: 40,
    },
  ];

  const config = {
    data: data,
    isStack: true,
    xField: 'year',
    yField: ['created', 'ongoing', 'completed'],
    seriesField: 'status',
    color: ['#5B8FF9', '#5AD8A6', '#5D7092'],
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
    legend: {
      position: 'top-left',
    },
    tooltip: {
      shared: true,
      showMarkers: false,
    },
  };

  return <Bar {...config} />;
};

ReactDOM.render(<DemoBar />, document.getElementById('container'));
