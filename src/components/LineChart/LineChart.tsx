import { Area } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { getTuitionSum } from '../../utils/statisticAPI.ts'


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
    data,
    padding: [40, 40, 80, 60],
    xField: 'date',
    yField: 'totalTuition',
    xAxis: {
      tickCount: 5,
    },
    smooth: true,
    point: {
      size: 2.5,
      shape: 'circle',
      style: {
        stroke: '#B94AB7',
      },
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },

    color: '#B94AB7'
  };
  return (
    <Area {...config} />

  )
}

export default LineChart
