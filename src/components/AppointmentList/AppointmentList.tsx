import React from 'react';
import { Col, List, Row } from 'antd';
import * as Styled from '../QuestionList/Question.styled';
import Container from '../Container';
import { Appointment } from './Appointment.type';
import AppointmentItem from './AppointmentItem/AppointmentItem';

const AppointmentList: React.FC<{ list: Appointment[], initLoading: boolean }> = (props) => {


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
                    <Styled.TutorItem>
                      <AppointmentItem item={item} />
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

export default AppointmentList;