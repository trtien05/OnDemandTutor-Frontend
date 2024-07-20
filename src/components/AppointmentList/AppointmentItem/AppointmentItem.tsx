import React from 'react';
import { Skeleton, Avatar } from 'antd';
import * as Styled from '../Appointment.styled';
import { CloseOutlined, UserOutlined } from '@ant-design/icons'; 
import { TimeSlot } from '../Appointment.type';
import { UserType } from '../../../hooks/useAuth';
import Reschedule from '../../../pages/Student/Appointment/Reschedule';
import { theme } from '../../../themes';
import Link from '../../Link';
import config from '../../../config';
import { useNavigate } from 'react-router-dom';

interface AppointmentItemProps {
    item: TimeSlot;
    user?: UserType;
    onCancel: (timeslotId: number) => void; // Define the onCancel callback prop
    viewMode: 'Upcoming' | 'Past';
    role: 'STUDENT' | 'TUTOR';
}


const AppointmentItem: React.FC<AppointmentItemProps> = ({ item, onCancel, viewMode, role }) => {
    const navigate = useNavigate();
    //Destructuring: Extracts startTime, endTime, scheduleDate, and appointment from the item prop.
    const { startTime, endTime, scheduleDate, appointment } = item; 

    //appointmentDate: Creates a new Date object for the appointment.
    const appointmentDate = new Date(`${scheduleDate}T${startTime}`); 

    const isTutor = role === 'TUTOR';
    const displayPerson = isTutor ? appointment.student : appointment.tutor;

    //Determines if the appointment can be rescheduled (if it's more than 24 hours away).
    const canReschedule = appointmentDate.getTime() - new Date().getTime() > 24 * 60 * 60 * 1000; 

    // Helper function to format time to "HH:mm"
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };
    const handleSendMessage = () => {
        navigate(`/chat-room`, { state: { id: appointment.student.studentId, fullName: displayPerson.fullName, avatar: displayPerson.avatarUrl } });
    };
    return (
        <Skeleton avatar title={false} loading={item.loading} active>
            <Styled.StyleCol lg={24} md={24} sm={24} xs={24}>
                <Styled.BoxHover>
                    <Styled.QuestionItem>
                        <Styled.StyleCol lg={2} md={2} sm={8} xs={8} >
                            <Styled.QuestionContent>
                                <Styled.QuestionRow
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        display: 'block',
                                        color: `${theme.colors.primary}`,
                                    }}
                                >


                                    {appointmentDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()}

                                </Styled.QuestionRow>

                                <Styled.QuestionRow
                                    style={{
                                        fontSize: '18px',
                                        textAlign: 'center',
                                        display: 'block',
                                        fontWeight: 'bold',
                                        color: `${theme.colors.primary}`,
                                    }}
                                >
                                    {appointmentDate.getDate()}
                                </Styled.QuestionRow>
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={5} md={5} sm={24} xs={16} >
                            <Styled.QuestionContent>
                                <Styled.QuestionRow
                                    style={{
                                        fontSize: '16px',
                                        alignContent: 'center',
                                        fontWeight: '500',
                                    }}
                                >

                                    {appointmentDate.toLocaleString('en-US', { weekday: 'long' })},{' '}
                                    {formatTime(startTime as string)} - {formatTime(endTime as string)}

                                </Styled.QuestionRow>
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={10} md={10} sm={24} xs={24}>
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
                                    {isTutor ? (
                                        <span onClick={handleSendMessage} style={{ cursor: 'pointer', color: `${theme.colors.primary}` }} >
                                        {displayPerson.fullName}
                                        </span>
                                    
                                    ) : (
                                        <Link to={`${config.routes.public.searchTutors}/${appointment.tutor.tutorId}`} underline scroll>
                                            {displayPerson.fullName}
                                        </Link>
                                    )},
                                </Styled.QuestionRowSpan>
                                <Styled.QuestionRowSpan>
                                    {appointment.subjectName}
                                </Styled.QuestionRowSpan>
                            </Styled.QuestionRow>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={3} md={3} sm={10} xs={10}>
                            <Styled.QuestionContent>
                                {viewMode === 'Upcoming' && (
                                    <Styled.QuestionRow
                                        style={{
                                            fontSize: '16px',
                                        }}
                                    >
                                        <Link to={`${appointment.tutor.meetingLink}`} underline scroll>Meet Link</Link>
                                    </Styled.QuestionRow>
                                )}
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        {viewMode === 'Upcoming' && (
                            <>

                                <Styled.StyleCol
                                    lg={2}
                                    md={2}
                                    sm={7}
                                    xs={7}
                                    style={{ textAlign: 'center' }}
                                >
                                    {canReschedule && (
                                        <Reschedule
                                            tutorId={item.appointment.tutor.tutorId}
                                            oldBooking={item}
                                        />
                                    )}
                                </Styled.StyleCol>

                                <Styled.StyleCol
                                    lg={2}
                                    md={2}
                                    sm={7}
                                    xs={7}
                                    style={{ textAlign: 'center' }}
                                >
                                    <CloseOutlined
                                        style={{
                                            color: '#B52121',
                                            fontSize: '20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => onCancel(item.timeslotId)} // Changed to arrow function to prevent immediate invocation
                                    />
                                </Styled.StyleCol>
                            </>
                        )}
                    </Styled.QuestionItem>
                </Styled.BoxHover>
            </Styled.StyleCol>
        </Skeleton>
    );
};

export default AppointmentItem;
