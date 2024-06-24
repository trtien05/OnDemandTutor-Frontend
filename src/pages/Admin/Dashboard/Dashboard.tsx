import React from 'react';
import { Col, Row } from 'antd';
import * as Styled from './Dashboard.syled'

const Dashboard: React.FC = () => {
  return (
    <div>
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
        <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
          <Styled.StyledBox style={{ height: '455px' }}>
            Box 5
          </Styled.StyledBox>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <Styled.StyledBox style={{ height: '455px' }}>
            Box 6
          </Styled.StyledBox>
        </Col>
      </Row>


    </div>
  );
}

export default Dashboard;
