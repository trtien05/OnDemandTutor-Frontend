import { Table } from "antd"
import { useEffect, useState } from "react";
import { getTopTutorsByRating } from "../../utils/statisticAPI";
import { FaStar } from "react-icons/fa";

const TopTutor = () => {

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopTutorsByRating()
      setTutors(data.content);
    };
    fetchData();
  }, []);
  const formatPrice = (price: number) => {
    const safePrice = Number(price) || 0;
    return `${safePrice.toLocaleString()} đ`;
  }
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 0; i < maxStars; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<FaStar key={i} style={{ color: '#ffc107' }} />);
      }
    }
    return stars;
  }
  const columns = [
    {
      title: 'Tutor Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Price Per Hour',
      dataIndex: 'teachingPricePerHour',
      render: (price: number) => formatPrice(price),
    },
    {
      title: 'Rating',
      dataIndex: 'averageRating',
      render: (rating: number) => renderRatingStars(rating),
    },


  ];
  return (
    <Table
      style={{ padding: '34px 0' }}
      columns={columns}
      dataSource={tutors}
      pagination={false}
    />
  )
}

export default TopTutor