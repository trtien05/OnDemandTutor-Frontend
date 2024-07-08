import { Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { getTutorCountBySubject } from '../../utils/statisticAPI';

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTutorCountBySubject();
      setData(data);
    };
    fetchData();
  }, []);

  const config = {
    data,
    angleField: 'tutorCount',
    colorField: 'subjectName',
    radius: 0.7,
    innerRadius: 0.6,

    legend: {
      visible: true,
      position: 'bottom' as 'bottom',
      layout: 'horizontal' as 'horizontal',
      itemName: {
        style: {
          fontSize: 14,
        },
      },
    },

    label: {
      content: '{name} {percentage}',

    },
    interactions: [

      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: undefined,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
  };
  return (
    <Pie {...config} />

  )
}

export default PieChart