import { useEffect, useState } from "react";
import { getTopTutorsByRating } from "../../utils/statisticAPI";
import { FaStar } from "react-icons/fa";
import { Table } from "antd";

const TopTutor = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopTutorsByRating();
      setTutors(data.content);
    };
    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    const safePrice = Number(price) || 0;
    return `${safePrice.toLocaleString()} đ`;
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 0; i < maxStars; i++) {
      stars.push(<FaStar key={i} style={{ color: i < Math.floor(rating) ? '#ffc107' : '#e4e5e9' }} />);
    }
    return stars;
  };

  const columns = [
    {
      title: 'Tutor Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: 'Price Per Hour',
      dataIndex: 'teachingPricePerHour',
      key: 'teachingPricePerHour',
      width: 150,
      render: (price: number) => formatPrice(price),
    },
    {
      title: 'Rating',
      dataIndex: 'averageRating',
      key: 'averageRating',
      width: 150,
      render: (rating: number) => renderRatingStars(rating),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tutors}
      pagination={false}
      style={{ padding: '25px 0' }}
      scroll={{ x: true }}
    />
  );
};

export default TopTutor;
