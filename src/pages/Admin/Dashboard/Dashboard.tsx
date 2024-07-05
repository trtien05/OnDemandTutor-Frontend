import React from 'react';
import { Col, Row } from 'antd';
import * as Styled from './Dashboard.syled'
import PieChart from '../../../components/PieChart/PieChart'
import LineChart from '../../../components/LineChart/LineChart'
import BarChart from '../../../components/BarChart/BarChart'


const Dashboard: React.FC = () => {

  return (
    <div >
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <Styled.StyledBox >
            Box 1
          </Styled.StyledBox>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <Styled.StyledBox >
            Box 1
          </Styled.StyledBox>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <Styled.StyledBox >
            Box 1
          </Styled.StyledBox>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>
          <Styled.StyledBox >
            Box 1
          </Styled.StyledBox>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ 'marginTop': '20px' }}>
        <Col xxl={15} xl={15} lg={15} md={24} sm={24} xs={24}>
          <Styled.StyledBox >
            <LineChart />
          </Styled.StyledBox>
        </Col>
        <Col xxl={9} xl={9} lg={9} md={24} sm={24} xs={24}>
          <Styled.StyledBox >
            <PieChart />
          </Styled.StyledBox>
        </Col>
      </Row>
      <Row gutter={[20, 20]} style={{ 'marginTop': '20px' }}>
        <Col xxl={15} xl={15} lg={15} md={24} sm={24} xs={24}>
          <Styled.StyledBox>
            <BarChart />
          </Styled.StyledBox>
        </Col>
        <Col xxl={9} xl={9} lg={9} md={24} sm={24} xs={24}>

          <Styled.StyledBox >
            Box 5
          </Styled.StyledBox>
        </Col>

      </Row>

    </div>
  );
}

export default Dashboard;
