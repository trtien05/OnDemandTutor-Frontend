import React from 'react';
import { Skeleton, Avatar } from 'antd';
import * as Styled from '../Appointment.styled';
import { CloseOutlined, UserOutlined } from '@ant-design/icons'; // Import the UserOutlined icon
import { TimeSlot } from '../Appointment.type';
import { UserType } from '../../../hooks/useAuth';
import Reschedule from '../../../pages/Student/Appointment/Reschedule';
import { theme } from '../../../themes';

interface AppointmentItemProps {
    item: TimeSlot;
    user?: UserType;
    onCancel: (timeslotId: number) => void; // Define the onCancel callback prop
    viewMode: 'Upcoming' | 'Past';
    role: 'STUDENT' | 'TUTOR';
}

// QuestionItemProps
const AppointmentItem: React.FC<AppointmentItemProps> = ({ item, onCancel, viewMode, role }) => {
    const { startTime, endTime, scheduleDate, appointment } = item;
    // const timeslot = item.timeslots[0];
    const appointmentDate = new Date(`${scheduleDate}T${startTime}`);
    const isTutor = role === 'TUTOR';
    const displayPerson = isTutor ? appointment.student : appointment.tutor;
    const canReschedule = appointmentDate.getTime() - new Date().getTime() > 24 * 60 * 60 * 1000;
    // Helper function to format time to "HH:mm"
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

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
                        <Styled.StyleCol lg={10} md={24} sm={24} xs={24}>
                            <Styled.QuestionRow>
                                {displayPerson.avatarUrl ? (
                                    <Avatar size={64} src={displayPerson.avatarUrl} />
                                ) : (
                                    <Avatar size={64} icon={<UserOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />} />
                                )}

                                <Styled.QuestionRowSpan
                                    style={{
                                        fontWeight: '500',
                                        marginLeft: '10px',
                                    }}
                                >
                                    {displayPerson.fullName},
                                </Styled.QuestionRowSpan>
                                <Styled.QuestionRowSpan>
                                    {appointment.subjectName}
                                </Styled.QuestionRowSpan>
                            </Styled.QuestionRow>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={3} md={24} sm={24} xs={24}>
                            <Styled.QuestionContent>
                                {viewMode === 'Upcoming' && (
                                    <Styled.QuestionRow
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            textDecoration: 'underline',
                                            color: `${theme.colors.primary}`,
                                        }}
                                    >
                                        <a
                                            href={appointment.tutor.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: `${theme.colors.primary}` }}
                                        >
                                            Meet Link
                                        </a>
                                    </Styled.QuestionRow>
                                )}
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        {viewMode === 'Upcoming' && (
                            <>
                                {/* <Styled.StyleCol
                            lg={2}
                            md={24}
                            sm={24}
                            xs={24}
                            style={{ textAlign: 'center' }}
                        >
                            <Reschedule tutorId={item.appointment.tutor.tutorId} oldBooking={item}/>
                            
                        </Styled.StyleCol> */}

                                <Styled.StyleCol
                                    lg={2}
                                    md={24}
                                    sm={24}
                                    xs={24}
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
                                    md={24}
                                    sm={24}
                                    xs={24}
                                    style={{ textAlign: 'center' }}
                                >
                                    <CloseOutlined
                                        style={{
                                            color: '#B52121',
                                            fontSize: '20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => onCancel(item.timeslotId)} // Changed to arrow function to prevent immediate invocation
                                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
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
