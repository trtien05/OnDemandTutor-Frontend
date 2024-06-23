import React, { useState } from 'react';
import { Col, Skeleton, Avatar, Modal } from 'antd';
import iconBachelor from '../../../assets/images/image13.png';
import * as Styled from '../Appointment.styled';
import { Question } from '../../QuestionList/Question.type';
import { CloseOutlined, UserOutlined } from '@ant-design/icons'; // Import the UserOutlined icon
import { Appointment } from '../Appointment.type';

interface AppointmentItemProps {
    item: Appointment;
}

// QuestionItemProps
const AppointmentItem: React.FC<AppointmentItemProps> = ({ item }) => {
    // const [open, setOpen] = useState(false);
    // const truncateContent = (content: string, maxLength: number) => {
    //     if (content.length <= maxLength) {
    //         return content;
    //     }
    //     return content.substring(0, maxLength) + '...';
    // };
    // const showModal = () => {
    //     setOpen(true);
    // };
    // const handleCancel = () => {
    //     console.log('Clicked cancel button');
    //     setOpen(false);
    // };
    //This function extracts the file extension from the URL correctly
    //by using the URL constructor, which handles query parameters.
    // const getFileExtension = (url: string) => {
    //     const path = new URL(url).pathname;
    //     const ext = path.split('.').pop();
    //     return ext ? ext.toLowerCase() : '';
    // };
    //This function now uses getFileExtension
    //to determine the file type and render the image or link accordingly.
    // const renderQuestionFile = (url: string) => {
    //     const fileExtension = getFileExtension(url);
    //     console.log(fileExtension); // for debugging

    //     if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
    //         return <Styled.QuestionImage src={url} alt="Question Image" />;
    //     } else if (fileExtension === 'pdf') {
    //         return (
    //             <a
    //                 href={url}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 style={{ fontStyle: 'italic', textDecoration: 'underline' }}
    //             >
    //                 Click to download PDF file
    //             </a>
    //         );
    //     }
    //     return null;
    // };
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
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        display: 'block',
                                    }}
                                >
                                    MAR
                                </Styled.QuestionRow>

                                <Styled.QuestionRow 
                                style={{
                                        textAlign: 'center',
                                        display: 'block',
                                    }}>11</Styled.QuestionRow>
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={8} md={20} sm={19} xs={16}>
                            <Styled.QuestionContent>
                                
                                <Styled.QuestionRow>
                                    <Styled.QuestionRow
                                        style={{
                                            fontSize: '16px',
                                            alignContent: 'center',
                                        }}
                                    >
                                        Monday, 11:00 - 12:00
                                    </Styled.QuestionRow>
                                </Styled.QuestionRow>
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={8} md={24} sm={24} xs={24}>
                        <Styled.QuestionRow>
                            <Avatar
                                size={64}
                                src="https://firebasestorage.googleapis.com/v0/b/mytutor-swp391.appspot.com/o/1%2FCreateQuestion_2024-06-10%2Fconfident-asian-woman-face-portrait-smiling.jpg?alt=media&token=e2198820-1471-4737-84d4-161f8c806dc9"
                                
                            />
                            
                            <Styled.QuestionRowSpan
                                style={{
                                    fontWeight: 'bold',
                                    marginLeft: '10px',
                                    
                                }}
                            >
                                {"Mia Basford,"}
                            </Styled.QuestionRowSpan>
                            <Styled.QuestionRowSpan
                                
                            >
                            {"English"}
                            </Styled.QuestionRowSpan>
                            </Styled.QuestionRow>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={4} md={24} sm={24} xs={24}>
                            <Styled.QuestionContent>
                                <Styled.QuestionRow
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Meet Link
                                </Styled.QuestionRow>
                            </Styled.QuestionContent>
                        </Styled.StyleCol>
                        <Styled.StyleCol lg={2} md={24} sm={24} xs={24} style={{textAlign:'center'}}>
                            <CloseOutlined style={{color:'#B52121', fontSize:'30px', cursor:'pointer'}}/>
                        </Styled.StyleCol>
                    </Styled.QuestionItem>
                </Styled.BoxHover>
            </Styled.StyleCol>
            

            </Skeleton>
        
    );
};

export default AppointmentItem;
