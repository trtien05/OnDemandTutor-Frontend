import React, { useEffect, useState } from 'react';
import { Col, Avatar, Modal, notification } from 'antd';
import iconBachelor from '../../../assets/images/image13.png';
import * as Styled from '../Question.styled';
import { Question } from '../../QuestionList/Question.type';
import { UserOutlined } from '@ant-design/icons'; // Import the UserOutlined icon
import { useAuth } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import FileViewer from '../../FileViewer/FileViewer';
interface QuestionItemProps {
    item: Question;
}
interface Student {
    id?: number;
    fullName?: string;
    avatarUrl?: string;
}
const QuestionItem: React.FC<QuestionItemProps> = ({ item }) => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const truncateContent = (content: string, maxLength: number) => {
        if (content.length <= maxLength) {
            return content;
        }
        return content.substring(0, maxLength) + '...';
    };
    const [student, setStudent] = useState<Student | null>(null);
    useEffect(() => {
        if (item) {
            setStudent({
                id: item.account.id,
                fullName: item.account.fullName,
                avatarUrl: item.account.avatarUrl || '',
            });
        }
    }, []);

    const navigate = useNavigate();
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    //This function extracts the file extension from the URL correctly
    //by using the URL constructor, which handles query parameters.
    const getFileExtension = (url: string) => {
        const path = new URL(url).pathname;
        const ext = path.split('.').pop();
        return ext ? ext.toLowerCase() : '';
    };

    //This function now uses getFileExtension
    //to determine the file type and render the image or link accordingly.
    const renderQuestionFile = (url: string) => {
        const fileExtension = getFileExtension(url);
        if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            return <Styled.QuestionImage src={url} alt="Question Image" />;
        } else if (fileExtension === 'pdf') {
            return (
                //Render pdf on the screen
                <FileViewer
                    alt="image"
                    fileUrl={url}
                    width="600px"
                    height="300px"
                    borderRadius="20px"
                />
            );
        }
        return null;
    };

    const handleSendMessage = () => {
        if (user?.role === 'TUTOR') {
            navigate(`/chat-room`, {
                state: { id: student?.id, fullName: student?.fullName, avatar: student?.avatarUrl },
            });
        } else {
            api.warning({
                message: 'Warning',
                description: 'You can not send messages to other student!',
            });
        }
    };
    return (
        <>
            {contextHolderNotification}
            <Col lg={24} md={24} sm={24} xs={24}>
                <Styled.BoxHover>
                    <Styled.QuestionItem>
                        {item.account.avatarUrl ? (
                            <Avatar
                                size={64}
                                src={item.account.avatarUrl}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '15px',
                                    left: '-30px',
                                    top: '-30px',
                                }}
                            />
                        ) : (
                            <Avatar
                                size={64}
                                icon={<UserOutlined />}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '15px',
                                    left: '-30px',
                                    top: '-30px',
                                }}
                            />
                        )}
                        <Col lg={21} md={20} sm={19} xs={16}>
                            <Styled.QuestionContent>
                                    <Styled.QuestionRow>
                                        <Styled.Name
                                            level={2}
                                            onClick={showModal}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {item.title}
                                        </Styled.Name>
                                        <Styled.QuestionRowSpan >
                                            <Styled.Button style={{marginLeft:'10px'}}>{item.status}</Styled.Button>
                                        </Styled.QuestionRowSpan>
                                    </Styled.QuestionRow>
                                
                                <Styled.QuestionRow>
                                    <Styled.QuestionRowSpan
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        {item.account.fullName}
                                    </Styled.QuestionRowSpan>
                                    <Styled.BachelorImage src={iconBachelor} alt="bachelor" />
                                    <Styled.QuestionRowSpan>
                                        {item.subjectName}
                                    </Styled.QuestionRowSpan>
                                    <Styled.QuestionRowSpan>
                                        Modified:{' '}
                                        {new Date(item.modifiedAt!).toISOString().split('T')[0]}
                                    </Styled.QuestionRowSpan>
                                </Styled.QuestionRow>
                                <Styled.Description>
                                    {truncateContent(item.content || '', 250)}
                                </Styled.Description>
                            </Styled.QuestionContent>
                        </Col>
                    </Styled.QuestionItem>
                </Styled.BoxHover>
            </Col>
            <Modal
                open={open}
                onCancel={handleCancel}
                width={700}
                closeIcon={null}
                styles={{
                    content: {
                        borderRadius: '50px',
                        padding: '50px',
                        boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)',
                    },
                }}
                footer={null}
            >
                <Col sm={24}>
                    <Styled.ModalStudentInfo>
                        <Col sm={3}>
                            {item.account.avatarUrl ? (
                                <Avatar
                                    size={55}
                                    src={item.account.avatarUrl}
                                    style={{
                                        borderRadius: '15px',
                                    }}
                                />
                            ) : (
                                <Avatar
                                    size={55}
                                    icon={<UserOutlined />}
                                    style={{
                                        borderRadius: '15px',
                                    }}
                                />
                            )}
                        </Col>
                        <Col sm={21}>
                            <div>
                                
                                <Styled.ModalStudentInfo
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {item.account.fullName}
                                </Styled.ModalStudentInfo>
                                
                                <Styled.ModalStudentInfo
                                    style={{
                                        display: 'inline',
                                    }}
                                >
                                    <Styled.BachelorImage src={iconBachelor} alt="bachelor" />
                                    <Styled.QuestionRowSpan>
                                        {item.subjectName}
                                    </Styled.QuestionRowSpan>
                                    <Styled.QuestionRowSpan>
                                        Modified:{' '}
                                        {new Date(item.modifiedAt!).toISOString().split('T')[0]}
                                    </Styled.QuestionRowSpan>
                                    <Styled.QuestionRowSpan>
                                        <Styled.Button >{item.status}</Styled.Button>
                                    </Styled.QuestionRowSpan>
                                    <Styled.QuestionRowSpan>
                                        <Styled.BookingTutorButton onClick={handleSendMessage}>
                                            Send Message
                                        </Styled.BookingTutorButton>
                                    </Styled.QuestionRowSpan>
                                </Styled.ModalStudentInfo>
                            </div>
                        </Col>
                    </Styled.ModalStudentInfo>
                </Col>
                <Styled.QuestionRow>
                    <Styled.Name level={2}>{item.title}</Styled.Name>
                </Styled.QuestionRow>
                <Styled.Description>{item.content}</Styled.Description>
                <Styled.QuestionRow>
                    {item.questionUrl && (
                        <Styled.QuestionRowSpan style={{overflow:'scroll'}} >
                            {renderQuestionFile(item.questionUrl)}
                        </Styled.QuestionRowSpan>
                    )}
                </Styled.QuestionRow>
            </Modal>
        </>
    );
};

export default QuestionItem;
