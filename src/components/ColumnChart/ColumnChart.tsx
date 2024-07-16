import { useEffect, useState } from "react";
import { getTuitionSum } from "../../utils/statisticAPI";
import { Column } from '@ant-design/plots';

const ColumnChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTuitionSum('subject')
      setData(data);
    };
    fetchData();
  }, []);

  const config = {
    data,
    xField: 'subjectName',
    yField: 'totalTuition',
    legend: false,
    height: 378,
    axis: { y: { labelFormatter: '~s' } },

    slider: {
      x: 'subjectName',
    },
    scale: {
      x: { padding: 0.1 },
    },
    style: {
      fill: '#B94AB7',
    },
  };
  return (
    <Column {...config} />
  )
}

export default ColumnChart