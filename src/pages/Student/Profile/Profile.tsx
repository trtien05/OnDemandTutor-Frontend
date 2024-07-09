import {
    Avatar,
    Button,
    Col,
    Flex,
    Form,
    Modal,
    Row,
    Skeleton,
    Spin,
    Table,
    Typography,
    UploadFile,
    notification,
} from 'antd';

import {
    ExclamationCircleOutlined,
    EyeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Upload, { RcFile } from 'antd/es/upload';
import { UploadChangeParam } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import calendar from 'dayjs/plugin/calendar';
import * as Styled from '../../../components/QuestionList/Question.styled';
import {
    getLearnStatistic,
    getPaymentHistory,
    getStudentListQuestion,
    updateProfile,
} from '../../../utils/profileAPI';
import { Gender } from '../../../utils/enums';
import iconBachelor from '../../../assets/images/image13.png';
import { theme } from '../../../themes';
import { useAuth, useDocumentTitle } from '../../../hooks';
import { Subjects, LearnStatistic } from '../../Admin/UserDetail/UserDetail.type';
import Container from '../../../components/Container';
import * as St from '../../Admin/UserDetail/UserDetail.styled';

import { fields } from './Profile.fields';
import { ProfileContainer, ProfileWrapper } from './Profile.styled';

import { uploadAvatar } from '../../../utils/UploadImg';

import { PaymentColumns, QuestionColumns } from './Table/Table';
import { Payment } from '../../../components/AppointmentList/Appointment.type';
import { Question } from '../../../components/QuestionList/Question.type';

dayjs.locale('vi');
dayjs.extend(calendar);

const { Title, Paragraph, Text } = Typography;
// const { RangePicker } = DatePicker;

const Profile = () => {
    useDocumentTitle('Profile | MyTutor');

    const { user } = useAuth();

    // Show toast
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const [modal, contextHolderModal] = Modal.useModal();
    const [form] = Form.useForm();
    const fieldComponents = useRef<JSX.Element[]>([]);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [learnStatistic, setLearnStatistic] = useState<LearnStatistic>();
    const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]); // Add paymentHistory state
    const [loading, setLoading] = useState<boolean>(false);
    const [studentListQuestion, setStudentListQuestion] = useState<Question[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Question | null>(null);
    const [reloadKey, setReloadKey] = useState(false); // State for reloading

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!user) return;

                form.setFieldsValue({
                    fullName: user.fullName,
                    dateOfBirth: user.dateOfBirth && dayjs(user.dateOfBirth),
                    gender: user.gender == 'male' ? Gender.MALE : Gender.FEMALE,
                    phoneNumber: user.phoneNumber,
                    avatarUrl: user.avatarUrl,
                    email: user.email,
                    address: user.address,
                });
                // console.log(user);
                setImageUrl(user.avatarUrl);
                // Get learn statistic
                
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
                console.error(`get user: ${error}`);
            } finally {
                setLoading(false);
            }
        })();
           
    }, [api, form, user, reloadKey]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!user) return;

                //get learn statistic
                const { data } = await getLearnStatistic(user.id);
                setLearnStatistic(data);
                //get payment history
                const { data: paymentData } = await getPaymentHistory(user.id);
                setPaymentHistory(paymentData.content || []);
                // get account's list of questions
                const { data: questionData } = await getStudentListQuestion(user.id);
                setStudentListQuestion(questionData.content || []);
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
        
    }, [api, user, reloadKey]);
    
    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Do you want to save changes?',
            content: 'Your profile will be updated with the new information.',
            icon: <ExclamationCircleOutlined />,
            okText: 'Save',
            onOk: form.submit,
            cancelText: 'Discharge',
        });
    };

    const handleFileSizeCheck = (file: any) => {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            api.error({
                message: 'Error',
                description: 'Image must smaller than 5MB!',
            });
        }
        return isLt5M;
    };
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            api.error({
                message: 'Error',
                description: 'You can only upload JPG/PNG file!',
            });
        }
        return !(isJpgOrPng && handleFileSizeCheck(file));
    };

    const handleUploadAvatar = async (info: UploadChangeParam<UploadFile<any>>) => {
        const file = info.file as RcFile;
        if (!file) return;

        // Display the local image preview
        setImageUrl(URL.createObjectURL(file));

        try {
            if (!user?.id) return;
            const url = await uploadAvatar(user.id, file as File, 'avatar');
            if (!url) return;

            setImageUrl(url);
           
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
        } finally {
            // setLoading(false);
        }
    };

    const handleUpdateProfile = async (values: any) => {
        try {
            setLoading(true);

            if (!user?.id) return;
            // const gender = values.gender===1?false:true;

            await updateProfile(user.id, {
                fullName: values.fullName,
                dateOfBirth: dayjs(values.dateOfBirth),
                gender: values.gender === Gender.FEMALE ? true : false,
                phoneNumber: values.phoneNumber,
                email: user.email,
                address: values.address,
                avatarUrl: imageUrl,
            });

            api.success({
                message: 'Success',
                description: 'Your profile has been updated successfully.',
            });
            
            
            
        } catch (error: any) {
            const errorMessage =
                error.response && error.response.data
                    ? JSON.stringify(error.response.data)
                    : error.message;
            api.error({
                message: 'Error',
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpdateProfileFailed = (values: any) => {
        console.log(values);
    };
    
    
    const handleView = (item: Question) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setSelectedItem(null);
    };
    const getFileExtension = (url: string) => {
        const path = new URL(url).pathname;
        const ext = path.split('.').pop();
        return ext ? ext.toLowerCase() : '';
    };
    const renderQuestionFile = (url: string) => {
        const fileExtension = getFileExtension(url);
        console.log(fileExtension); // for debugging

        if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            return <Styled.QuestionImage src={url} alt="Question Image" />;
        } else if (fileExtension === 'pdf') {
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontStyle: 'italic', textDecoration: 'underline' }}
                >
                    Click to download PDF file
                </a>
            );
        }
        return null;
    };
    const modifiedQuestionColumns = QuestionColumns(setReloadKey).map((column) => {
        if (column.key === 'view') {
            return {
                ...column,
                render: (_text: any, record: Question) => (
                    <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
                ),
            };
        }
        return column;
    });
    return (
        <>
            {contextHolderNotification}

            <ProfileContainer>
                <Container>
                    <Spin spinning={loading} tip="Loading...">
                        <Flex vertical gap={44}>
                            <ProfileWrapper>
                                <Row gutter={40}>
                                    <Col lg={12} sm={24}>
                                        <St.CustomerContent vertical align="center">
                                            <ImgCrop
                                                quality={1}
                                                rotationSlider
                                                aspectSlider
                                                showReset
                                                showGrid
                                            >
                                                <Upload
                                                    name="avatar"
                                                    listType="picture-circle"
                                                    showUploadList={false}
                                                    beforeUpload={beforeUpload}
                                                    onChange={handleUploadAvatar}
                                                    accept=".jpg,.jpeg,.png"
                                                >
                                                    {imageUrl ? (
                                                        <Avatar src={imageUrl} size={125} />
                                                    ) : (
                                                        <Avatar
                                                            icon={<UserOutlined />}
                                                            size={125}
                                                        />
                                                    )}
                                                </Upload>
                                            </ImgCrop>

                                            <Title
                                                style={{ color: `${theme.colors.primary}` }}
                                                level={3}
                                            >
                                                {user?.fullName}
                                            </Title>

                                            <Text>
                                                {`Joined date: `}
                                                {user?.createAt
                                                    ? dayjs(user.createAt).format('DD/MM/YYYY')
                                                    : ''}
                                            </Text>

                                            <St.CustomerInfoItem vertical gap={10}>
                                                <Title level={3}>Learning Process</Title>

                                                <St.CustomerInfoBox vertical gap={6}>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Lessons booked:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {learnStatistic?.totalLessons ||
                                                                        0}
                                                                </Text>
                                                                <Text>lessons</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>

                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Tutors booked:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {learnStatistic?.totalLearntTutor ||
                                                                        0}
                                                                </Text>
                                                                <Text>tutors</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Subjects learned:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {learnStatistic?.totalSubjects
                                                                        .map(
                                                                            (subjects: Subjects) =>
                                                                                subjects.subjectName,
                                                                        )
                                                                        .join(', ') || 0}
                                                                </Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                </St.CustomerInfoBox>
                                            </St.CustomerInfoItem>

                                            <St.CustomerInfoItem vertical gap={10}>
                                                <Title level={3}>This month</Title>

                                                <St.CustomerInfoBox vertical gap={6}>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Lessons booked:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {learnStatistic?.thisMonthLessons ||
                                                                        0}
                                                                </Text>
                                                                <Text>lessons</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>

                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Tutors booked:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {learnStatistic?.thisMonthTutor ||
                                                                        0}
                                                                </Text>
                                                                <Text>tutors</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Subjects learned:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {learnStatistic?.thisMonthSubjects
                                                                        .map(
                                                                            (subjects: Subjects) =>
                                                                                subjects.subjectName,
                                                                        )
                                                                        .join(', ') || 0}
                                                                </Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                </St.CustomerInfoBox>
                                            </St.CustomerInfoItem>
                                        </St.CustomerContent>
                                    </Col>

                                    <Col lg={12} sm={24}>
                                        <Flex vertical gap={18}>
                                            <St.CustomerInfoItem vertical gap={10}>
                                                <Title level={3}>Information</Title>
                                            </St.CustomerInfoItem>

                                            <Form
                                                form={form}
                                                onFinish={handleUpdateProfile}
                                                onFinishFailed={handleUpdateProfileFailed}
                                                layout="vertical"
                                                autoComplete="off"
                                            >
                                                {fields.map((field) => {
                                                    if (fieldComponents.current.length === 2)
                                                        fieldComponents.current = [];

                                                    const component = (
                                                        <Form.Item
                                                            key={field.key}
                                                            label={field.label}
                                                            name={field.name}
                                                            initialValue={field.initialValue}
                                                            rules={field.rules}
                                                            required
                                                            style={
                                                                field.halfWidth
                                                                    ? { width: '50%' }
                                                                    : { width: '100%' }
                                                            }
                                                        >
                                                            {field.component}
                                                        </Form.Item>
                                                    );

                                                    if (field.halfWidth) {
                                                        fieldComponents.current.push(component);

                                                        if (fieldComponents.current.length !== 2)
                                                            return;
                                                    }

                                                    return fieldComponents.current.length === 2 ? (
                                                        <Flex gap={12} key={field.key}>
                                                            {fieldComponents.current.map(
                                                                (component) => component,
                                                            )}
                                                        </Flex>
                                                    ) : (
                                                        component
                                                    );
                                                })}

                                                <Flex justify="flex-end">
                                                    <Button
                                                        type="primary"
                                                        onClick={confirm}
                                                        style={{
                                                            width: '150px',
                                                            borderRadius: '25px',
                                                        }}
                                                    >
                                                        Save
                                                    </Button>
                                                </Flex>
                                            </Form>
                                        </Flex>
                                    </Col>
                                </Row>
                            </ProfileWrapper>
                        </Flex>
                        <Flex vertical>
                            <ProfileWrapper style={{ marginTop: '10px' }}>
                                <Row gutter={44}>
                                    <Col span={24}>
                                        <St.CustomerInfoItem vertical gap={10}>
                                            <Title level={3}>Your questions</Title>
                                        </St.CustomerInfoItem>
                                        <Table
                                            // columns={QuestionColumns}
                                            columns={modifiedQuestionColumns}
                                            dataSource={studentListQuestion}
                                            // reloadKey = {reloadKey}
                                            showSorterTooltip={{ target: 'sorter-icon' }}
                                            rowKey={(record: Question) => record.id.toString()}
                                            pagination={{ pageSize: 4 }}
                                        />
                                    </Col>

                                    <Col span={24}>
                                        <St.CustomerInfoItem vertical gap={10}>
                                            <Title level={3}>Payment History</Title>
                                        </St.CustomerInfoItem>
                                        <Table
                                            columns={PaymentColumns}
                                            dataSource={paymentHistory}
                                            // onChange={onChangeEducation}
                                            showSorterTooltip={{ target: 'sorter-icon' }}
                                            rowKey={(record: Payment) => record.id.toString()}
                                            pagination={{ pageSize: 4 }}
                                        />
                                    </Col>
                                </Row>
                            </ProfileWrapper>
                        </Flex>
                    </Spin>
                </Container>
            </ProfileContainer>

            {contextHolderModal}

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
                            {selectedItem?.account.avatarUrl ? (
                                <Avatar
                                    size={55}
                                    src={selectedItem?.account.avatarUrl}
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
                                    {selectedItem?.account.fullName}
                                </Styled.ModalStudentInfo>
                                <Styled.ModalStudentInfo
                                    style={{
                                        display: 'inline',
                                    }}
                                >
                                    <Styled.BachelorImage src={iconBachelor} alt="bachelor" />
                                    <Styled.QuestionRowSpan>
                                        {selectedItem?.subjectName}
                                    </Styled.QuestionRowSpan>
                                    {/* <Styled.QuestionRowSpan>
                                        Uploaded:{' '}
                                        {new Date(item.createdAt!).toISOString().split('T')[0]}
                                    </Styled.QuestionRowSpan> */}

                                    {selectedItem?.modifiedAt && (
                                        <Styled.QuestionRowSpan>
                                            Modified:{' '}
                                            {
                                                new Date(selectedItem.modifiedAt)
                                                    .toISOString()
                                                    .split('T')[0]
                                            }
                                        </Styled.QuestionRowSpan>
                                    )}
                                    <Styled.QuestionRowSpan>
                                        <Styled.Button>{selectedItem?.status}</Styled.Button>
                                    </Styled.QuestionRowSpan>
                                </Styled.ModalStudentInfo>
                            </div>
                        </Col>
                    </Styled.ModalStudentInfo>
                </Col>
                <Styled.QuestionRow>
                    <Styled.Name level={2}>{selectedItem?.title}</Styled.Name>
                </Styled.QuestionRow>
                <Styled.Description>{selectedItem?.content}</Styled.Description>
                <Styled.QuestionRow>
                    {selectedItem?.questionUrl && (
                        <Styled.QuestionRowSpan>
                            {renderQuestionFile(selectedItem?.questionUrl)}
                        </Styled.QuestionRowSpan>
                    )}
                </Styled.QuestionRow>
            </Modal>
        </>
    );
};

export default Profile;
