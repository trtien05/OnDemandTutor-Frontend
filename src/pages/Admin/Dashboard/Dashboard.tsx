import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import * as Styled from './Dashboard.syled'
// import PieChart from '../../../components/PieChart/PieChart'
// import LineChart from '../../../components/LineChart/LineChart'
// import ColumnChart from '../../../components/ColumnChart/ColumnChart'
import Title from 'antd/es/typography/Title';
import TopTutor from '../../../components/TopTutor/TopTutor';
import { getNumberOfRole, getProfitThisMonth, getRevenueThisMonth } from '../../../utils/statisticAPI';
import { DollarCircleOutlined, LineChartOutlined, OrderedListOutlined, UserOutlined } from '@ant-design/icons';

interface Revenue {
  revenue: number;
  month: string;
}

interface Profit {
  profit: number;
  month: string;
}

const Dashboard: React.FC = () => {
  const [revenue, setRevenue] = useState<Revenue | null>(null);
  const [profit, setProfit] = useState<Profit | null>(null);
  const [numTutor, setNumTutor] = useState(0);
  const [numStudent, setNumStudent] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Revenue Data
      const responseRevenue = await getRevenueThisMonth();
      setRevenue(responseRevenue.data)

      // Fetch Profit Data
      const responseProfit = await getProfitThisMonth();
      setProfit(responseProfit.data)

      // Fetch Revenue Data
      const responseNumTutor = await getNumberOfRole('TUTOR');
      setNumTutor(responseNumTutor.data)

      // Fetch Revenue Data
      const responseNumStudent = await getNumberOfRole('STUDENT');
      setNumStudent(responseNumStudent.data)
    }
    fetchData();
  }, [])

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <Styled.StyledBoxNumber>
            <Styled.IconWrapper>
              <DollarCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            </Styled.IconWrapper>
            <Styled.ContentWrapper>
              <Styled.Title>{revenue?.revenue.toLocaleString()}đ</Styled.Title>
              <Styled.Description>Revenue/{revenue?.month}</Styled.Description>
            </Styled.ContentWrapper>
          </Styled.StyledBoxNumber>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <Styled.StyledBoxNumber>
            <Styled.IconWrapper>
              <LineChartOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
            </Styled.IconWrapper>
            <Styled.ContentWrapper>
              <Styled.Title>{profit?.profit.toLocaleString()}đ</Styled.Title>
              <Styled.Description>Profit/{profit?.month}</Styled.Description>
            </Styled.ContentWrapper>
          </Styled.StyledBoxNumber>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <Styled.StyledBoxNumber>
            <Styled.IconWrapper>
              <OrderedListOutlined style={{ fontSize: '24px', color: '#faad14' }} />
            </Styled.IconWrapper>
            <Styled.ContentWrapper>
              <Styled.Title>{numTutor}</Styled.Title>
              <Styled.Description>Tutors</Styled.Description>
            </Styled.ContentWrapper>
          </Styled.StyledBoxNumber>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <Styled.StyledBoxNumber>
            <Styled.IconWrapper>
              <UserOutlined style={{ fontSize: '24px', color: '#722ed1' }} />
            </Styled.IconWrapper>
            <Styled.ContentWrapper>
              <Styled.Title>{numStudent}</Styled.Title>
              <Styled.Description>Students</Styled.Description>
            </Styled.ContentWrapper>
          </Styled.StyledBoxNumber>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ 'marginTop': '20px' }}>
        <Col xxl={15} xl={15} lg={15} md={24} sm={24} xs={24}>
          <Styled.StyledBox >
            <Title level={5} style={{ color: '#B94AB7' }}>Total Revenue</Title>
            {/* <LineChart /> */}
          </Styled.StyledBox>
        </Col>
        <Col xxl={9} xl={9} lg={9} md={24} sm={24} xs={24}>
          <Styled.StyledBox >
            <Title level={5} style={{ color: '#B94AB7' }}>Distribution of Tutors by Subject</Title>
            {/* <PieChart /> */}
          </Styled.StyledBox>
        </Col>
      </Row>
      <Row gutter={[20, 20]} style={{ 'marginTop': '20px' }}>
        <Col xxl={9} xl={9} lg={24} md={24} sm={24} xs={24}>
          <Styled.StyledBox>
            <Title level={5} style={{ color: '#B94AB7' }}>Revenue by Subjects</Title>
            {/* <ColumnChart /> */}
          </Styled.StyledBox>
        </Col>
        <Col xxl={15} xl={15} lg={24} md={24} sm={24} xs={24}>
          <Styled.StyledBox >
            <Title level={5} style={{ color: '#B94AB7' }}>Top Tutors</Title>
            <TopTutor />
          </Styled.StyledBox>
        </Col>

      </Row>

    </div>
  );
}

export default Dashboard;
