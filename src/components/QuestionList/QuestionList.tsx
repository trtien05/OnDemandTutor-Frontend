import React from 'react';
import { Col, List, Row } from 'antd';
import * as Styled from './Question.styled';
import Container from '../Container';
import { Question } from '../QuestionList/Question.type';
import QuestionItem from '../QuestionList/QuestionItem/QuestionItem'

const QuestionList: React.FC<{ list: Question[], initLoading: boolean }> = (props) => {


  return (
    <>
      <Styled.TutorFilteredSection>
        <Container>
          <Styled.TutorFiltered>
            <Row justify='space-between'>
              <Col lg={24} md={24} xs={24} sm={24}>
                <List
                  loading={props.initLoading}
                  itemLayout="horizontal"
                  dataSource={props.list}
                  renderItem={(item) => (
                    <Styled.TutorItem
                      // onMouseEnter={(event) => handleMouseEnter(event, item)}
                      // translate={typeof translateY === 'number' ? "no" : translateY}
                      >
                      <QuestionItem item={item} />
                    </Styled.TutorItem>
                  )}
                />
              </Col>
            </Row>

          </Styled.TutorFiltered>
        </Container>
      </Styled.TutorFilteredSection>
    </>
  
  );
}

export default QuestionList;