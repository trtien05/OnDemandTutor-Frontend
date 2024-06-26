import React from 'react';
import { Col, List, Row } from 'antd';
import * as Styled from './Appointment.styled';
import Container from '../Container';
import { Appointment, TimeSlot } from './Appointment.type';
import AppointmentItem from './AppointmentItem/AppointmentItem';
import { useAuth } from '../../hooks';

const AppointmentList: React.FC<{ list: TimeSlot[], initLoading: boolean }> = (props) => {
  const {user} = useAuth();

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
                      <AppointmentItem item={item} user={user} />
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