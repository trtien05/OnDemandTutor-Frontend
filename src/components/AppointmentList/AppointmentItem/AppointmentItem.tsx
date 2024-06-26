import React, { useState } from 'react';
import { Col, Skeleton, Avatar, Modal } from 'antd';
import iconBachelor from '../../../assets/images/image13.png';
import * as Styled from '../Appointment.styled';
import { CloseOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons'; // Import the UserOutlined icon
import { Appointment, TimeSlot } from '../Appointment.type';
import { UserType } from '../../../hooks/useAuth';
import Reschedule from '../../../pages/Student/Appointment/Reschedule';

interface AppointmentItemProps {
    item: TimeSlot;
    user?: UserType;
    onCancel: (timeslotId: number) => void; // Define the onCancel callback prop
}

// QuestionItemProps
const AppointmentItem: React.FC<AppointmentItemProps> = ({ item, user, onCancel }) => {
    const { startTime, endTime, scheduleDate, appointment,  } = item;
    // const timeslot = item.timeslots[0];
    const appointmentDate = new Date(`${scheduleDate}T${startTime}`);
    const isTutor = user?.role === 'TUTOR';
    const displayPerson = isTutor ? appointment.student : appointment.tutor;
    
    return (
        <Skeleton avatar title={false} loading={item.loading} active>
            <Styled.StyleCol lg={24} md={24} sm={24} xs={24}>
                <Styled.BoxHover>
                    {/* justify="space-between" */}
                    <Styled.QuestionItem>
                        <Styled.StyleCol lg={2} md={4} sm={4} xs={24}>
                            <Styled.QuestionContent>
                                <Styled.QuestionRow
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        display: 'block',
                                    }}
                                >
                                    {appointmentDate.toLocaleString('default', { month: 'short' }).toUpperCase()}
                                </Styled.QuestionRow>

                                <Styled.QuestionRow
                                    style={{
                                        fontSize: '18px',
                                        textAlign: 'center',
                                        display: 'block',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {appointmentDate.getDate()}
                                </Styled.QuestionRow>
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        {/* <Styled.StyleCol lg={8} md={20} sm={19} xs={16}>
                            <Styled.QuestionContent>
                                
                                <Styled.QuestionRow>
                                    <Styled.QuestionRow
                                        style={{
                                            fontSize: '16px',
                                            alignContent: 'center',
                                        }}
                                    >
                                        {appointmentDate.toLocaleString('default', { weekday: 'long' })}, {timeslot.startTime} - {timeslot.endTime}
                                    </Styled.QuestionRow>
                                </Styled.QuestionRow>
                            </Styled.QuestionContent>
                        </Styled.StyleCol> */}
                        <Styled.StyleCol lg={5} md={20} sm={19} xs={16}>
                            <Styled.QuestionContent>
                                <Styled.QuestionRow
                                    style={{ fontSize: '16px', alignContent: 'center' }}
                                >
                                    <p>{appointmentDate.toLocaleString('default', { weekday: 'long' })}
                                    , {startTime} - {endTime}</p>
                                </Styled.QuestionRow>
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={10} md={24} sm={24} xs={24}>
                            <Styled.QuestionRow>
                                {displayPerson.avatarUrl ? (
                                    <Avatar size={64} src={displayPerson.avatarUrl} />
                                ) : (
                                    <Avatar size={64} icon={<UserOutlined />} />
                                )}

                                <Styled.QuestionRowSpan
                                    style={{
                                        fontWeight: '500',
                                        marginLeft: '10px',
                                    }}
                                >
                                    {displayPerson.fullName},
                                </Styled.QuestionRowSpan>
                                <Styled.QuestionRowSpan>{appointment.subjectName}</Styled.QuestionRowSpan>
                            </Styled.QuestionRow>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={3} md={24} sm={24} xs={24}>
                            <Styled.QuestionContent>
                                <Styled.QuestionRow
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    <a
                                        href={appointment.tutor.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#000' }}
                                    >
                                        Meet Link
                                    </a>
                                </Styled.QuestionRow>
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        <Styled.StyleCol
                            lg={2}
                            md={24}
                            sm={24}
                            xs={24}
                            style={{ textAlign: 'center' }}
                        >
                            <CalendarOutlined style={{ fontSize: '30px', cursor: 'pointer' }}
                            />
                            
                        </Styled.StyleCol>
                        <Styled.StyleCol
                            lg={2}
                            md={24}
                            sm={24}
                            xs={24}
                            style={{ textAlign: 'center' }}
                        >
                            {/* <CloseOutlined
                                style={{ color: '#B52121', fontSize: '30px', cursor: 'pointer' }}
                                onClick={() => onCancel(item.timeslotId)} // Changed to arrow function to prevent immediate invocation
                            /> */}
                            <Reschedule tutorId={item.appointment.tutor.tutorId} oldBooking={item}/>
                        </Styled.StyleCol>
                    </Styled.QuestionItem>
                </Styled.BoxHover>
            </Styled.StyleCol>
        </Skeleton>
    );
};

export default AppointmentItem;
