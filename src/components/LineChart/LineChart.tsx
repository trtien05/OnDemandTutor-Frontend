import { Area } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { getTuitionSum } from '../../utils/statisticAPI.ts'
import { format } from 'fecha';

const LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTuitionSum('date')
      setData(data);
    };
    fetchData();
  }, []);


  const config = {
    data: data,
    xField: (data: { date: string | number | Date; }) => new Date(data.date),
    yField: 'totalTuition',
    axis: { y: { labelFormatter: '~s' } },
    slider: {
      x: { labelFormatter: (date: Date) => format(date, 'DD/MM/YYYY') },
    },
    style: {
      fill: 'linear-gradient(-90deg, white 0%, #B94AB7 100%)',
    },
    line: {
      style: {
        stroke: '#B94AB7',
        strokeWidth: 2,
      },
    },
    height: 532,

  };
  return (
    <Area {...config} />

  )
}

export default LineChart
