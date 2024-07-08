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
    padding: [40, 40, 100, 60],

    columnWidthRatio: 0.2,
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: true,

      },
    },
    slider: {
      start: 0.1,
      end: 1,
    },
    color: '#B94AB7'
  };
  return (
    <Column {...config} />
  )
}

export default ColumnChart