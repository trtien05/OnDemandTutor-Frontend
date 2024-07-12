import React from 'react';
import { Col, List, Row, Skeleton } from 'antd';
import * as Styled from './Question.styled';
import Container from '../Container';
import { Question } from '../QuestionList/Question.type';
import QuestionItem from '../QuestionList/QuestionItem/QuestionItem'

const QuestionList: React.FC<{ list: Question[], initLoading: boolean }> = (props) => {


  return (
    <>
      <Styled.TutorFilteredSection>
        <Container>
          <div>
            <Row justify='space-between'>
              <Col lg={24} md={24} xs={24} sm={24}>
                <Skeleton style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '50px', height: '80px' }} paragraph={{ rows: 3 }} avatar loading={props.initLoading} active>
                  <List
                    itemLayout="horizontal"
                    dataSource={props.list}
                    renderItem={(item) => (
                      <Styled.TutorItem>
                        <QuestionItem item={item} />
                      </Styled.TutorItem>
                    )}
                  />
                </Skeleton>
              </Col>
            </Row>
            </div>
        </Container>
      </Styled.TutorFilteredSection>
    </>

  );
}

export default QuestionList;