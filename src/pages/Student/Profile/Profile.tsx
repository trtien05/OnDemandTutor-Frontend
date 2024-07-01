import {
    Avatar,
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Image,
    List,
    Modal,
    Row,
    Skeleton,
    Spin,
    Typography,
    UploadFile,
    notification,
} from 'antd';
// import { TimeRangePickerProps } from 'antd/lib';
// import locale from 'antd/es/date-picker/locale/vi_VN';
import {
    ExclamationCircleOutlined,
    // Loading3QuartersOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Upload, { RcFile } from 'antd/es/upload';
import { UploadChangeParam } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import calendar from 'dayjs/plugin/calendar';

import fallbackImage from '@/assets/images/fallback-img.png';
import { getLearnStatistic, getProfile, updateProfile } from '../../../utils/profileAPI';
import { Subject, Role, Gender } from '../../../utils/enums';

// import InfiniteScroll from '@/components/InfiniteScroll';
import { theme } from '../../../themes';
import { useAuth, useDocumentTitle } from '../../../hooks';
import { Subjects, LearnStatistic } from '../../Admin/UserDetail/UserDetail.type';
import Container from '../../../components/Container';
import * as St from '../../Admin/UserDetail/UserDetail.styled';

import { fields } from './Profile.fields';
import { ProfileContainer, ProfileWrapper } from './Profile.styled';
import { UserType } from '../../../hooks/useAuth';
import { uploadCreateQuestionFiles } from '../../../utils/uploadCreateQuestionFiles';
import { uploadAvatar } from '../../../utils/UploadImg';
import React from 'react';

dayjs.locale('vi');
dayjs.extend(calendar);

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

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
    const [loading, setLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!user) return;

                
                form.setFieldsValue({
                    fullName: user.fullName,
                    dateOfBirth: user.dateOfBirth && dayjs(user.dateOfBirth),
                    gender: user.gender== "male" ?  Gender.MALE: Gender.FEMALE,
                    phoneNumber: user.phoneNumber,
                    avatarUrl: user.avatarUrl,
                    email: user.email,
                    address: user.address,
                });
                // console.log(user);
                setImageUrl(user.avatarUrl);
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
    }, [reload, user]);
    
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!user) return;
                
                
                const { data } = await getLearnStatistic(user.id);
                setLearnStatistic(data);
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [reload, user]);
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
    const handleFileSizeCheck = (file:any) => {
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
            // setReload(!reload);
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
                // .add(7, 'hours')
                gender: values.gender===Gender.MALE?true:false,
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
            const errorMessage = error.response && error.response.data ? JSON.stringify(error.response.data) : error.message;
            api.error({
                message: 'Error',
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };
    // const handleUpdateProfile = (values: any) => {
    //     console.log(values);
    // };
    const handleUpdateProfileFailed = (values:any) => {
        console.log(values);
    };

    
    return (
        <>
            {contextHolderNotification}

            <ProfileContainer>
                <Container>
                    <Spin spinning={loading} tip="Loading...">
                        <Flex vertical gap={44}>
                            <ProfileWrapper>
                                <Row gutter={40}>
                                    <Col lg={12}  sm={24} >
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
                                                        <Avatar
                                                            src={imageUrl}
                                                            size={125}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            icon={<UserOutlined />}
                                                            size={125}
                                                        />
                                                    )} 
                                                    
                                                </Upload>
                                            </ImgCrop>
                                            
                                            
                                            <Title style={{color: `${theme.colors.primary}`}}level={3}>{user?.fullName}</Title>
                                            
                                            <Text>
                                                {`Joined date: `}
                                                {user?.createAt ? dayjs(user.createAt).format('DD/MM/YYYY') : ''}
                                            </Text>

                                            <St.CustomerInfoItem vertical gap={10}>
                                                <Title level={3}>Learning Process</Title>

                                                <St.CustomerInfoBox vertical gap={6}>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Lessons booked:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {learnStatistic?.totalLessons||0}
                                                                    
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
                                                                {learnStatistic?.totalLearntTutor||0}
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
                                                                {learnStatistic?.totalSubjects.map((subjects:Subjects)=>subjects.subjectName).join(', ')||0}
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
                                                                {learnStatistic?.thisMonthLessons||0}
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
                                                                {learnStatistic?.thisMonthTutor||0}
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
                                                                {learnStatistic?.thisMonthSubjects.map((subjects:Subjects)=>subjects.subjectName).join(', ')||0}
                                                                </Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                </St.CustomerInfoBox>
                                            </St.CustomerInfoItem>
                                        </St.CustomerContent>
                                    </Col>

                                    <Col lg={12}  sm={24}>
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

                                                <Flex justify="flex-end" >
                                                    <Button type="primary" onClick={confirm} style={{width:'150px', borderRadius:'25px'}}>
                                                        Save
                                                    </Button>
                                                </Flex>
                                            </Form>
                                        </Flex>
                                    </Col>
                                </Row>
                            </ProfileWrapper>

                            
                        </Flex>
                    </Spin>
                </Container>
            </ProfileContainer>

            {contextHolderModal}
        </>
    );
};

export default Profile;
