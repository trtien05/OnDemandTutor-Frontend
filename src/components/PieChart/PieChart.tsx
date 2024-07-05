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
    legend: {
      visible: true,
      position: 'bottom' as 'bottom',
      layout: 'horizontal' as 'horizontal', // Đặt layout của chú thích thành ngang để hiển thị nhiều chú thích hơn
      itemName: {
        style: {
          fontSize: 14, // Điều chỉnh kích thước chữ để phù hợp hơn
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
  };
  return (
    <Pie {...config} />

  )
}

export default PieChart