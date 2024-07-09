import { Steps, Typography, TimePicker, notification } from "antd";
import { useState, useCallback, useEffect } from "react";
import { educationForm, certificateForm, FieldType } from "./Form.fields";
import dayjs, { Dayjs } from 'dayjs'
import Form1 from "./Form1";
import Form2 from "./Form2";
import MultipleSteps from "./MultipleSteps";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";
import { theme } from "../../themes";
import {
  addEducations, updateDetails, addCertificates,
  addTutorDescription, becomeTutor, addAvailableSchedule,
  getAccountById
} from "../../utils/tutorRegisterAPI";
import useAuth from '../../hooks/useAuth';
import { uploadImage } from "../../utils/UploadImg";
import { useNavigate } from "react-router-dom";
import * as Styled from './BecomeTutor.style'
import Container from "../../components/Container";
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import config from "../../config";

const { Title } = Typography;

const BecomeTutor = () => {
  const [aboutValues, setAboutValues] = useState<any>();
  const [accountId, setAccountId] = useState<number>();
  const [educationValues, setEducationValues] = useState<any>();
  const [certificationValues, setCertificationValues] = useState<any>();
  const [descriptionValues, setDescriptionValues] = useState(null);
  const [timePriceValues, setTimePriceValues] = useState(null);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [isTicked, setIsTicked] = useState<boolean>(false);
  const [diploma, setDiploma] = useState<FieldType[][]>([
    educationForm
  ]);
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState<FieldType[][]>([
    certificateForm,
  ]);
  const [avatarURL, setAvatarURL] = useState<string>('')
  const [diplomaURL, setDiplomaURL] = useState<string[]>([])
  const [certURL, setCertURL] = useState<string[]>([])
  const [api, contextHolderNotification] = notification.useNotification({
    top: 100,
  });
  const { user } = useAuth();

  //Check User is it Student 
  useEffect(() => {
    setAccountId(user?.id);
  }, [user]);
  // setAccountId(user?.id);

  async function fetchAccount(tutorId: number) {
    try {
      const response = await getAccountById(tutorId);
      setDataSource(response.data)
    } catch (error: any) {
      api.error({
        message: 'Lỗi',
        description: error.response ? error.response.data : error.message,
      });
    }
  }

  useEffect(() => {
    if (accountId) {
      fetchAccount(accountId);
    }
  }, [accountId])

  const [dataSource, setDataSource] = useState([])

  const handleAvatarURL = (url: string) => {
    setAvatarURL(url)
  }
  const handleDiplomaURLChange = (url: string) => {
    setDiplomaURL((prevState) => [...prevState, url])
  }
  const handleCertificateURLChange = (url: string) => {
    setCertURL((prevState) => [...prevState, url])
  }


  //---------------------------------------FORM 5----------------------------------------
  interface VisibilityState {
    [key: string]: boolean;
  }
  type FormState = {
    [key in keyof VisibilityState]: FieldType[];
  };

  const [visibility, setVisibility] = useState<VisibilityState>({
    'monday': true,
    'tuesday': true,
    'wednesday': true,
    'thursday': true,
    'friday': true,
    'saturday': true,
    'sunday': true,
  })
  const [timeslotAgreement, setTimeslotAgreement] = useState<boolean>(false)
  const setVisibilityForDay = (day: string, value: boolean) => {
    setVisibility(prevState => ({ ...prevState, [day]: value }));
  };
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleInputChange = (
    day: string,
    index: number,
    value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    setTimeslotForm((prevState) => {
      const updatedFields = prevState[day].map(
        (field, i) =>
          i === index ? { ...field, initialValue: value } : field
      );
      return { ...prevState, [day]: updatedFields };
    });
  };

  const getDisabledTime = (day: string, index: number, form: FormState) => {
    const existingTimes = form[day]
      .filter((_, i) => i !== index)
      .map(field => field.initialValue)
      .filter(Boolean) as [Dayjs, Dayjs][];

    let latestEndTime: Dayjs;

    existingTimes.forEach(timeslot => {
      if (timeslot && timeslot[1]) {
        if (!latestEndTime || timeslot[1].isAfter(latestEndTime)) {
          latestEndTime = timeslot[1];
        }
      }
    });

    return {
      disabledHours: () => {
        const hours = Array.from({ length: 24 }, (_, i) => i);
        if (!latestEndTime) {
          return [];
        } else {
          return hours.filter(hour => hour < latestEndTime.hour());
        }
      },
      disabledMinutes: (selectedHour: number) => {
        const minutes = Array.from({ length: 60 }, (_, i) => i);
        if (!latestEndTime || selectedHour > latestEndTime.hour()) {
          return minutes.filter(minute => minute % 15 !== 0);
        }
        if (selectedHour === latestEndTime.hour()) {
          return minutes.filter(minute => minute < latestEndTime.minute() || minute % 15 !== 0);
        }
        return minutes.filter(minute => minute % 15 !== 0);
      },
    };
  };

  const validateRange = (_: unknown, value: [Dayjs, Dayjs]) => {
    const [start, end] = value;
    if (end.diff(start, 'minutes') > 180 || end.diff(start, 'hours') < 1) {
      return Promise.reject('The time range cannot exceed 3 hours');
    }
    return Promise.resolve();
  };


  const timeslotSelection = (day: string,
    index: number,
    initialValue: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null): FieldType => ({
      key: `${day}_${index}`,
      label: '',
      name: `${day}_timeslot_${index}`,
      rules: [
        {
          required: true,
          message: 'Please select your timeslot for this day.',
        },
        {
          validator: validateRange,
          message: 'A timeslot must be at least 1 hour and must not exceed 3 hours.',
        },
      ],
      children: (
        <TimePicker.RangePicker
          size='small'
          format={'HH:mm'}
          minuteStep={15}
          value={initialValue}
          placeholder={['From', 'To']}
          onChange={(times) => handleInputChange(day, index, times)}
          disabledTime={() => getDisabledTime(day, index, timeslotForm)}
          style={{ width: `100%` }} />
      ),
      $width: `90%`,
    })

  const initialFormState = (): FormState => {
    return daysOfWeek.reduce((acc, day) => {
      acc[day as keyof VisibilityState] = [timeslotSelection(day, 0, null)];
      return acc;
    }, {} as FormState);
  };

  const [timeslotForm, setTimeslotForm] = useState<FormState>(initialFormState())
  //end form 5
  //----------------------------FINISH ABOUT FORM----------------------------------
  const onFinishAboutForm = (values: any) => {
    setAboutValues(values);

    next();
  };

  const onFinishEducationForm = (values: any) => {
    setEducationValues(values);
    next();
  };

  const onFinishCertificationForm = (values: any) => {
    setCertificationValues(values);
    next();
  };
  //-----------------------------------FINISH DESCRIPTION FORM---------------------------
  const onFinishDescriptionForm = (values: any) => {
    setDescriptionValues(values);
    if (accountId) {
      saveToFirebase(accountId)
    }
    next();
  };

  //---------------------------------FINISH TIMESLOT FORM-----------------------------
  const onFinishTimePriceForm = async (values: any) => {
    setTimePriceValues(values);
    if (accountId) {
      try {
        const save = await saveData(values, accountId);
        const status = saveBecomeTutor(accountId);
        console.log('status:', status)
        console.log('save:', save)
        if (save !== undefined && status !== undefined)
          navigate(config.routes.student.registerStatus, { state: 'sent' });
        else navigate(config.routes.student.registerStatus, { state: 'error' });
      } catch (error: any) {
        api.error({
          message: 'Lỗi',
          description: error.response ? error.response.data.message : error.message,
        });
      }
    }
    // api.success({
    //   message: 'Success',
    //   description: 'Your form has been Sent',
    // });
    // setTimeout(() => {
    //   navigate('/');
    // }, 2000);

    next();
  };

  const saveToFirebase = async (tutorId: number) => {
    //upload avatar to firebase
    let avatarUploadPromise
    if (aboutValues && aboutValues.fileList[0] && accountId) {
      avatarUploadPromise = uploadImage(tutorId, aboutValues.fileList[0].originFileObj, 'avatar', accountId, handleAvatarURL)
    }
    //upload diploma to firebase
    const diplomaUploadPromises = [];
    if (educationValues != null) {
      const numberOfEntries1 = Math.max(
        ...Object.keys(educationValues)
          .filter(key => key.includes('_'))
          .map(key => {
            const lastPart = key.split('_').pop();
            return lastPart ? parseInt(lastPart, 10) : 0;
          })
      ) + 1;
      for (let i = 0; i < numberOfEntries1; i++) {
        diplomaUploadPromises.push(uploadImage(tutorId, educationValues[`diplomaVerification_${i}`][0].originFileObj, 'diploma', i, handleDiplomaURLChange));
      }
    }
    //upload cert to firebase
    const certificateUploadPromises = [];
    if (certificationValues != null) {
      if (certificationValues[`certificateVerification_0`]) {
        const numberOfEntries2 = Math.max(
          ...Object.keys(certificationValues)
            .filter(key => key.includes('_'))
            .map(key => {
              const lastPart = key.split('_').pop();
              return lastPart ? parseInt(lastPart, 10) : 0;
            })
        ) + 1;
        for (let i = 0; i < numberOfEntries2; i++) {
          certificateUploadPromises.push(uploadImage(tutorId, certificationValues[`certificateVerification_${i}`][0].originFileObj, 'certificate', i, handleCertificateURLChange));
        }
      }
    }
    if (certificateUploadPromises.length > 0) {
      await Promise.all([avatarUploadPromise, ...diplomaUploadPromises, ...certificateUploadPromises]);
    } else { await Promise.all([avatarUploadPromise, ...diplomaUploadPromises]); }

  }

  const saveData = async (values: any, tutorId: number) => {
    try {

      await saveAccountDetails(tutorId, aboutValues, avatarURL)
       
      await saveEducations(tutorId, educationValues, diplomaURL)
       
      await saveCertificates(tutorId, certificationValues, certURL)
       
      await saveTutorDescription(tutorId, descriptionValues)

      await saveTutorAvailableTimeslots(tutorId, values)
      
      return 'Success'
    } catch (error:any) {
      return Promise.reject(error);
    }
  }

  const onClickBack = () => {
    back();
  };

  const handleAgreementChange = (checked: boolean) => {
    setAgreement(checked);
  };

  const handleTickChange = (checked: boolean) => {
    setIsTicked(checked);
  };

  const handleDayVisibility = (day: string, checked: boolean) => {
    setVisibilityForDay(day, checked);
  }

  const handleTimeslotAgreement = (checked: boolean) => {
    setTimeslotAgreement(checked);
  }

  const handleAddTimeslot = (day: string) => {
    setTimeslotForm(prevState => {
      const newIndex = (prevState[day].length);
      return {
        ...prevState,
        [day]: [...prevState[day], timeslotSelection(day, newIndex, null)],
      };
    });
  }


  const handleRemoveTimeslot = (day: string, formIndex: number) => {
    setTimeslotForm(prevState => ({
      ...prevState,
      [day]: prevState[day].filter((_, index) => index !== formIndex),
    }));
  }

  const handleAddDiploma = () => {
    const newFieldKey = diploma.length * educationForm.length;
    const newForm: FieldType[] = educationForm.map((field) => ({
      key: field.key + newFieldKey,
      label: field.label,
      name: field.name,
      rules: field.rules,
      initialValue: field.initialValue,
      children: field.children,
      $width: field.$width,
    }));
    setDiploma([...diploma, newForm]);
    // console.log(form)
  };

  const handleAddCertificate = useCallback(() => {
    const newFieldKey = certificate.length * certificateForm.length;
    const newForm: FieldType[] = certificateForm.map((field) => ({
      key: field.key + newFieldKey,
      label: field.label,
      name: field.name,
      rules: field.rules,
      initialValue: field.initialValue,
      children: field.children,
      $width: field.$width,
    }));
    setCertificate((prevForm) => [...prevForm, newForm]);
    // console.log(form)
  }, [certificate.length]);

  const handleRemoveDiploma = (formIndex: number) => {
    if (diploma.length > 1) {
      setDiploma(diploma.filter((_, index) => index !== formIndex));
    } else {
      alert("At least one form must be present.");
    }
  };

  const handleRemoveCertificate = useCallback((formIndex: number) => {
    if (certificate.length > 1) {
      setCertificate((prevForm) =>
        prevForm.filter((_, index) => index !== formIndex)
      );
    } else {
      alert("At least one form must be present.");
    }
  },
    [certificate.length]
  );

  const { current, back, step, next, goTo } = MultipleSteps([
    <Form1
      onFinish={onFinishAboutForm}
      initialValues={aboutValues}
      dataSource={dataSource}
      agreement={agreement}
      onAgreementChange={handleAgreementChange}
    />,
    <Form2
      onFinish={onFinishEducationForm}
      initialValues={educationValues}
      onClickBack={onClickBack}
      diploma={diploma}
      onAddDiploma={handleAddDiploma}
      onRemoveDiploma={handleRemoveDiploma}
    />,
    <Form3
      onFinish={onFinishCertificationForm}
      initialValues={certificationValues}
      onClickBack={onClickBack}
      isTicked={isTicked}
      onTickChange={handleTickChange}
      certificate={certificate}
      onAddCertificate={handleAddCertificate}
      onRemoveCertificate={handleRemoveCertificate}
      certificateURL={certURL}
    />,
    <Form4
      onFinish={onFinishDescriptionForm}
      initialValues={descriptionValues}
      onClickBack={onClickBack}
    />,
    <Form5
      onFinish={onFinishTimePriceForm}
      initialValues={timePriceValues}
      onClickBack={onClickBack}
      visibility={visibility}
      onAddTimeslot={handleAddTimeslot}
      onRemoveTimeslot={handleRemoveTimeslot}
      timeslotAgreement={timeslotAgreement}
      onVisibilityChange={handleDayVisibility}
      onTimeslotAgreementChange={handleTimeslotAgreement}
      timeslotForm={timeslotForm}
    />,
  ]);

  const isDisabled = (stepNumber: number) => {
    {
      /*Disable next step until previous step done*/
    }
    if (stepNumber == 0) {
      return false;
    }
    if (stepNumber == 1) {
      return aboutValues === null || agreement === false;
    }
    if (stepNumber == 2) {
      return aboutValues === null || educationValues === null;
    }
    if (stepNumber == 3) {
      return (
        aboutValues === null ||
        educationValues === null ||
        certificationValues === null
      );
    }
    if (stepNumber == 4) {
      return (
        aboutValues === null ||
        educationValues === null ||
        certificationValues === null ||
        descriptionValues === null
      );
    }
  };
  //------------------------------------FETCH BECOME TUTOR API-------------------------------
  async function saveBecomeTutor(tutorId: number) {
    try {
      const response = await becomeTutor(tutorId);
      console.log(' saved successfully:', response);
      return 'success'
    } catch (error: any) {
      api.error({
        message: 'Lỗi',
        description: error.response ? error.response.data : error.message,
      });
    }
  }
  //------------------------------------FETCH ACCOUNT DETAILS API----------------------------


  async function saveAccountDetails(tutorId: number, formData: any, url: any) {

    // Get JSON body from form data
    const jsonRequestBody = convertAccountDetailsFormData(formData, url);

    try {

      // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
      const responseData = await updateDetails(tutorId, jsonRequestBody);

      // Check response status
      if (!api.success) {
        throw new Error(`Error: ${responseData.statusText}`);
      }

      // Get response data
      console.log('Account details saved successfully:', responseData);

      // Return success response
      return responseData;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  function convertAccountDetailsFormData(formData: any, url: any) {
    // convert form data to account details data
    return {
      fullName: formData[`fullName`],
      phoneNumber: formData[`phoneNumber`],
      dateOfBirth: formData[`dayOfBirth`].format('YYYY-MM-DD'),
      gender: formData[`gender`],
      address: formData[`address`],
      avatarUrl: url,
    };
  }
  //------------------------------------FETCH EDUCATION API----------------------------
  async function saveEducations(tutorId: number, formData: any, url: any) {
    // Get JSON body from form data
    const jsonRequestBody = convertEducationFormData(formData, url);

    try {

      // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
      const responseData = await addEducations(tutorId, jsonRequestBody);

      // Check response status
      if (!api.success) {
        throw new Error(`Error: ${responseData.statusText}`);
      }

      // Get response data
      console.log('Educations saved successfully:', responseData);

      // Return success response
      return responseData
    } catch (error: any) {
      return Promise.reject(error);
    }
  }


  function convertEducationFormData(formData: any, url: any) {
    const educationData = [];

    const numberOfEntries = Math.max(
      ...Object.keys(formData)
        .filter(key => key.includes('_'))
        .map(key => parseInt(key.split('_').pop() ?? '0'))
    ) + 1;

    for (let i = 0; i < numberOfEntries; i++) {
      const entry = {
        majorName: formData[`majorName_${i}`] || formData.majorName,
        specialization: formData[`specialization_${i}`] || formData.specialization,
        universityName: formData[`universityName_${i}`] || formData.universityName,
        degreeType: formData[`degreeType_${i}`] || formData.degreeType,
        startYear: formData[`academicYear_${i}`][0].$y,
        endYear: formData[`academicYear_${i}`][1].$y,
        diplomaUrl: url[i] || formData.diplomaUrl
      };

      educationData.push(entry);
    }

    return educationData;
  }
  //------------------------------------FETCH CERTIFICATE API----------------------------
  async function saveCertificates(tutorId: number, formData: any, url: any) {

    // Get JSON body from form data
    const jsonRequestBody = convertCertificateFormData(formData, url);

    try {

      // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
      const responseData = await addCertificates(tutorId, jsonRequestBody);

      // Check response status
      if (!api.success) {
        throw new Error(`Error: ${responseData.statusText}`);
      }

      // Get response data
      console.log('Certificates saved successfully:', responseData);

      // Return success response
      return responseData;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  function convertCertificateFormData(formData: any, url: any) {
    const certificateData = [];

    const numberOfEntries = Math.max(
      ...Object.keys(formData)
        .filter(key => key.includes('_'))
        .map(key => parseInt(key.split('_').pop() ?? '0'))
    ) + 1;

    for (let i = 0; i < numberOfEntries; i++) {
      const entry = {
        // convert form data to certificate json format
        subject: formData[`subject_${i}`] || formData.subject,
        certificateName: formData[`certificateName_${i}`] || formData.certificateName,
        description: formData[`description_${i}`] || formData.description,
        issuedBy: formData[`issuedBy_${i}`] || formData.issuedBy,
        issuedYear: formData[`issuedYear_${i}`].$y,
        certificateUrl: url[i] || formData.certificateUrl,
      };

      certificateData.push(entry);
    }

    return certificateData;
  }
  //------------------------------------FETCH TUTOR DESCRIPTION API----------------------------
  async function saveTutorDescription(tutorId: number, formData: any) {

    // Get JSON body from form data
    const jsonRequestBody = convertTutorDescriptionFormData(formData);

    try {

      // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
      const responseData = await addTutorDescription(tutorId, jsonRequestBody);

      // Check response status
      if (!api.success) {
        throw new Error(`Error: ${responseData.statusText}`);
      }

      // Get response data
      console.log('Tutor description saved successfully:', responseData);

      // Return success response
      return responseData;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  function convertTutorDescriptionFormData(formData: any) {
    const descriptionData = {
      // convert form data to tutor description json format
      teachingPricePerHour: formData.amount,
      backgroundDescription: formData.description,
      meetingLink: formData.meetingLink,
      videoIntroductionLink: formData.youtubeLink,
      subjects: formData.checkedValues,
    };

    return descriptionData;
  }
  //------------------------------------FETCH SCHEDULE API----------------------------------
  async function saveTutorAvailableTimeslots(tutorId: number, formData: any) {

    // Get JSON body from form data
    const jsonRequestBody = convertTimeslotsToJSON(formData);
    try {

      // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
      const responseData = await addAvailableSchedule(tutorId, jsonRequestBody);

      // Check response status
      if (!api.success) {
        throw new Error(`Error: ${responseData.statusText}`);
      }

      // Get response data
      console.log('Tutor available timeslots saved successfully:', responseData);

      // Return success response
      return responseData;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  function convertTimeslotsToJSON(formData: any) {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const jsonResult: { startTime: any; endTime: any; dayOfWeek: number; }[] = [];

    daysOfWeek.forEach((day, index) => {
      // Check for timeslots for the current day
      for (let i = 0; formData[`${day}_timeslot_${i}`]; i++) {
        const timeslot = formData[`${day}_timeslot_${i}`];
        if (timeslot && timeslot.length === 2) {
          const startTime = timeslot[0].format("HH:mm:ss");
          const endTime = timeslot[1].format("HH:mm:ss");

          jsonResult.push({
            startTime,
            endTime,
            dayOfWeek: index + 2, // Monday is 2, Sunday is 8
          });

        }
      }
    });

    return jsonResult;
  }

  //----------------------------------------------------------------------------------------
  return (
    <>
      {user?.role === "STUDENT" ? (
        <div style={{ background: `white`, padding: `3%` }}>
          {contextHolderNotification}
          <Title
            style={{
              color: `${theme.colors.primary}`,
              textTransform: `capitalize`,
              textAlign: `center`,
            }}
          >
            Become our tutor!
          </Title>
          <div style={{ margin: `5%` }}>
            <Steps current={current} onChange={goTo}>
              <Steps.Step disabled={isDisabled(0)} title="About"></Steps.Step>
              <Steps.Step disabled={isDisabled(1)} title="Education"></Steps.Step>
              <Steps.Step disabled={isDisabled(2)} title="Certification"></Steps.Step>
              <Steps.Step disabled={isDisabled(3)} title="Description"></Steps.Step>
              <Steps.Step disabled={isDisabled(4)} title="Availability & Pricing"></Steps.Step>
            </Steps>
          </div>
          {step}
        </div>
      ) : user?.role === "TUTOR" && user?.status === "PROCESSING" ? (
        <Styled.CheckSection>
          <Container>
            <Styled.CheckInner>
              <Styled.CheckErrorMsg>
                <AiOutlineExclamationCircle size={80} color={theme.colors.yellow} />
                <Title level={2}>Your Tutor Form Is Under Processing</Title>
              </Styled.CheckErrorMsg>
            </Styled.CheckInner>
          </Container>
        </Styled.CheckSection>
      ) : user?.role === "TUTOR" && user?.status === "ACTIVE" ? (
        <Styled.CheckSection>
          <Container>
            <Styled.CheckInner>
              <Styled.CheckErrorMsg>
                <AiOutlineCheckCircle size={80} color={theme.colors.success} />
                <Title level={2}>You Are Our Tutor</Title>
              </Styled.CheckErrorMsg>
            </Styled.CheckInner>
          </Container>
        </Styled.CheckSection>
      ) : null}
    </>
  );
};
export default BecomeTutor;
