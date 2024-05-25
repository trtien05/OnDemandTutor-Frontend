import React from 'react';
import { useDocumentTitle } from '../../hooks';
import * as Styled from './Tutors.styled';
import Container from '../../components/Container';
import { Col, Row } from 'antd';

function Tutors() {
  useDocumentTitle('Search Tutors | MyTutor');

  return (
    <Styled.FilterSection>
      <Row>
        <Col lg={24}>
          <Styled.FilterWrapper>
            123
          </Styled.FilterWrapper>
        </Col>
      </Row>
    </Styled.FilterSection>
  );
}

export default Tutors;