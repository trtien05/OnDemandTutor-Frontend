import { useEffect, useState } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useAuth from '../../hooks/useAuth';
import { getTutorById, getTutorStatistic } from '../../utils/tutorAPI';
import { Certificate, Details, Education } from './TutorProfile.type';
import { Avatar, Col, Flex, Radio, Row, Skeleton, Spin, Typography, notification } from 'antd';
import * as Style from './TutorProfile.styled';
import Container from '../../components/Container';
import { UserOutlined } from '@ant-design/icons';

import { getTutorEducation } from '../../utils/tutorAPI';
import TableComponent from '../../components/Table/Table';
import { getTutorCertification } from '../../utils/tutorAPI';
import EducationForm from './FormComponent/EducationForm';
import CertificationForm from './FormComponent/CertificationForm';
import ScheduleForm from './FormComponent/ScheduleForm';
import DescriptionForm from './FormComponent/DescriptionForm';
import { useNavigate } from 'react-router-dom';
import SubjectForm from './FormComponent/SubjectForm';
import Schedule from '../../components/Schedule/Schedule';
import AddTimeslot from './FormComponent/AddTimeslot';
import DisplaySchedule from './DisplayComponent/DisplaySchedule';


const { Title, Paragraph, Text } = Typography;

const TutorProfile = () => {
    useDocumentTitle('Tutor Profile');
    const [tutorDetails, setTutorDetails] = useState<Details>();
    const [tutorEducation, setTutorEducation] = useState<Education[]>();
    const [tutorCert, setTutorCert] = useState<Certificate[]>();
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const [update, isUpdate] = useState<boolean>(false);
    const [updateEducation, isUpdateEducation] = useState<boolean>(false);
    // const [checkUser, isCheckUser] = useState<boolean>(false);
    const [updateCert, isUpdateCert] = useState<boolean>(false);
    const [updateSchedule, isUpdateSchedule] = useState<boolean>(false);
    const { user, role } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [tableDisplay, setTableDisplay] = useState<string>("education");
    const [statistic, setStatistic] = useState<any>([]);
    const navigate = useNavigate();

    //---------------------FETCH DATA---------------------
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                
                if (!user || !(role == "TUTOR")) return;
                const { data } = await getTutorById(user.id);
                await setTutorDetails({
                    backgroundDescription: data.backgroundDescription,
                    teachingPricePerHour: data.teachingPricePerHour,
                    meetingLink: data.meetingLink,
                    videoIntroductionLink: data.videoIntroductionLink,
                    subjects: data.subjects,
                });
                
                const response = await getTutorStatistic(user.id);
                if (response) {
                    setStatistic(response.data);
                }
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                isUpdate(false);
                setLoading(false);
            }
        })();
    }, [user, update]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!user || !(role == "TUTOR")) return;
                const education = (await getTutorEducation(user.id)).data;

                await setTutorEducation(
                    education.map((education: any) => ({
                        id: education.id,
                        majorName: education.majorName,
                        specialization: education.specialization,
                        universityName: education.universityName,
                        degreeType: education.degreeType,
                        academicYear: `${education.startYear} - ${education.endYear}`,
                        verified: education.verified ? "Yes" : "No",
                    })));
                
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                isUpdateEducation(false);
                setLoading(false);
            }
        })();
    }, [user, updateEducation]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!user || !(role == "TUTOR")) return;
                const certificate = (await getTutorCertification(user.id)).data;

                await setTutorCert(
                    certificate.map((certificate: any) => ({
                        id: certificate.id,
                        certificateName: certificate.certificateName,
                        description: certificate.description,
                        issuedBy: certificate.issuedBy,
                        issuedYear: certificate.issuedYear,
                        verified: certificate.verified ? "Yes" : "No",
                        subject: certificate.subject !== null?certificate.subject:"Other",
                    })));

            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                isUpdateCert(false);
                setLoading(false);
            }
        })();
    }, [user, updateCert]);


    return (
        <>
            <Style.ProfileContainer>
                <Container>
                    {contextHolder}
                    <Spin spinning={loading} tip="Đang tải...">
                        <Flex vertical gap={44}>
                            <Style.ProfileWrapper>
                                <Row gutter={40}>
                                    <Col xl={12} lg={12} sm={24} xs={24}>
                                        <Style.ProfileContent vertical align="center">
                                            {user?.avatarUrl ? (
                                                <Avatar
                                                    src={user?.avatarUrl}
                                                    size={125}
                                                />
                                            ) : (
                                                <Avatar
                                                    icon={<UserOutlined />}
                                                    size={125}
                                                />
                                            )}
                                            <Title level={1}>{user?.fullName}</Title>
                                            <Style.ProfileInfoItem vertical gap={10}>
                                                <Title level={3}>Overview</Title>

                                                <Style.ProfileInfoBox vertical gap={6}>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Total lessons:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {statistic?.totalLessons?statistic?.totalLessons:0}
                                                                </Text>
                                                                <Text>lessons</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>

                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Income made:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                {statistic?.totalIncome?Math.round((statistic?.totalIncome)).toLocaleString('en-US'):0}
                                                                </Text>
                                                                <Text>VND</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                </Style.ProfileInfoBox>
                                            </Style.ProfileInfoItem>
                                            <Style.ProfileInfoItem vertical gap={10}>
                                                <Title level={3}>This month</Title>

                                                <Style.ProfileInfoBox vertical gap={6}>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Total lessons:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                {statistic?.thisMonthLessons?statistic?.thisMonthLessons:0}
                                                                </Text>
                                                                <Text>lessons</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>

                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Income made:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                {statistic?.totalMonthlyIncome?Math.round(statistic?.totalMonthlyIncome).toLocaleString('en-US'):0}
                                                                </Text>
                                                                <Text>VND</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                </Style.ProfileInfoBox>
                                            </Style.ProfileInfoItem>
                                            <Style.ProfileInfoItem vertical gap={10}>
                                                <Title level={3}>Teaching subject</Title>
                                                <Style.ProfileInfoBox vertical gap={6}>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex wrap='wrap' justify='flex-start' 
                                                            style={{paddingLeft:`10px`}}>
                                                            {tutorDetails?.subjects.map(
                                                                (subject, index) => (
                                                                <Text key={index}>{subject}</Text>))}   
                                                        </Flex>
                                                    </Skeleton>
                                               </Style.ProfileInfoBox>
                                               <div style={{textAlign:`right`}}>
                                             { user?.id && tutorDetails && 
                                             tutorEducation && tutorCert &&
                                             <SubjectForm tutorId={user?.id} 
                                                isUpdate={isUpdate}
                                                tutorDetails={tutorDetails} 
                                                educationData={tutorEducation? tutorEducation:[]}
                                                certificateData={tutorCert? tutorCert:[]} />}
                                                </div>
                                            </Style.ProfileInfoItem>
                                            <Style.ProfileInfoItem vertical gap={10}>
                                                <Title level={3}>Your schedule</Title>
                                                <Skeleton loading={loading} paragraph={false}>
                                                {user?.id &&
                                                    (<div style={{ textAlign: `right` }}>
                                                        <DisplaySchedule tutorId={user?.id} update={updateSchedule} />
                                                        <AddTimeslot tutorId={user?.id} 
                                                            isUpdate={isUpdateSchedule} 
                                                            update={updateSchedule} />
                                                        <ScheduleForm tutorId={user?.id} isUpdate={isUpdateSchedule} /></div>)}
                                                </Skeleton>
                                            </Style.ProfileInfoItem>
                                        </Style.ProfileContent>
                                    </Col>

                                    <Col xl={12} lg={12} sm={24} xs={24}>
                                        <Title level={3}>Tutor details</Title>

                                        {tutorDetails !== undefined && user &&
                                            <DescriptionForm tutorDetails={tutorDetails} tutorId={user?.id} isUpdate={isUpdate} />}
                                    </Col>
                                </Row>
                            </Style.ProfileWrapper>

                            <Style.ProfileWrapper>
                                <Row gutter={40}>
                                    <Col span={24}>
                                    <Skeleton loading={loading} paragraph={false}>
                                        <Flex vertical gap="middle" >
                                            <Radio.Group defaultValue={tableDisplay}
                                                onChange={(e) => setTableDisplay(e.target.value)}
                                                buttonStyle="solid">
                                                <Radio.Button value="education">Diplomas</Radio.Button>
                                                <Radio.Button value="certificate">Certificates</Radio.Button>
                                            </Radio.Group>
                                        </Flex>
                                        <div style={{ textAlign: `right`, margin: `20px`,overflow:`scroll` }}>
                                            {tableDisplay.includes("education") ? (<>
                                                <TableComponent dataType={tableDisplay}
                                                    EducationData={tutorEducation} />
                                                {user?.id && tutorEducation?.length &&
                                                    <EducationForm tutorId={user?.id}
                                                        lastIndex={tutorEducation?.length}
                                                        isUpdate={isUpdateEducation} />}
                                            </>) : <><TableComponent dataType={tableDisplay}
                                                CertificateData={tutorCert} />
                                                {user?.id &&
                                                    <CertificationForm tutorId={user?.id}
                                                        lastIndex={tutorCert?.length}
                                                        isUpdate={isUpdateCert} />
                                                }</>}
                                        </div>
                                        </Skeleton>
                                    </Col>
                                </Row>
                            </Style.ProfileWrapper>
                        </Flex>
                    </Spin>
                </Container>
            </Style.ProfileContainer >
        </>
    )
}

export default TutorProfile