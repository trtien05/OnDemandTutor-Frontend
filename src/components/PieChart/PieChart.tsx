import { Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { getTutorCountBySubject } from '../../utils/statisticAPI';

const PieChart = () => {
  //fix piechart
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
    innerRadius: 0.6,
    height: 532,
    labels: [
      { text: 'subjectName', style: { fontSize: 10, fontWeight: 'bold' } },
      {
        text: 'tutorCount',
        style: {
          fontSize: 9,
          dy: 12
        },
      },

    ],
    tooltip: false, // Tắt tooltip khi hover

    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },

  };

  return (
    <Pie {...config} />

  )
}

export default PieChart