import { Steps, Typography, TimePicker, UploadFile, notification } from "antd";
import * as FormStyled from "./Form.styled";
import { useState, useCallback } from "react";
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
  addTutorDescription, becomeTutor, addAvailableSchedule
} from "../../api/tutorRegisterAPI";
import useAuth from '../../hooks/useAuth';

import { uploadImage } from "../../components/UploadImg";
import { UploadChangeParam } from "antd/es/upload";
export default function FirstPage() {
  const [aboutValues, setAboutValues] = useState(null);
  const [educationValues, setEducationValues] = useState(null);
  const [certificationValues, setCertificationValues] = useState(null);
  const [descriptionValues, setDescriptionValues] = useState(null);
  const [timePriceValues, setTimePriceValues] = useState(null);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [isTicked, setIsTicked] = useState<boolean>(false);
  const [diploma, setDiploma] = useState<FieldType[][]>([
    educationForm
  ]);
  const [certificate, setCertificate] = useState<FieldType[][]>([
    certificateForm,
  ]);
  const [diplomaURL, setDiplomaURL] = useState<string[]>([])
  const [certURL, setCertURL] = useState<string[]>([])
  const [diplomaFile, setDiplomaFile] = useState({ })
  const [api, contextHolderNotification] = notification.useNotification({
    top: 100,
  });
  const { Title } = Typography;
  const { user } = useAuth();
  // const handleDiplomaChange = (name, newFileList) => {
  //   setDiplomaFile(prevState => ({
  //     ...prevState,
  //     [name]: newFileList,
  //   }));
  // };
  // const handleDiplomaChange = (name: string, info: UploadChangeParam<UploadFile<any>>) => {
  //   let files = [...info.fileList];
  //   setDiplomaFile(prev => ({
  //     ...prev,
  //     [name]: files,
  //   }));
  //   console.log(`Updated fileList for ${name}:`, files);
  //   ;
  // }
  const handleDiplomaChange = (info: any, formIndex: number) => {
    const updatedFileList = [...info.fileList];
    setDiplomaFile((prev: any) => {
      const newState = [...prev];
      newState[formIndex] = updatedFileList;
      return newState;
    });
  };
  //FORM 5
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

  const getDisabledHours = (day: string, index: number, form: FormState) => {
    const existingTimes = form[day]
      .filter((_, i) => i !== index)
      .map(field => field.initialValue)
      .filter(Boolean);

    let latestEndHour = -1;
    existingTimes.forEach(timeslot => {
      if (timeslot && timeslot[1].hour() > latestEndHour) {
        latestEndHour = timeslot[1].hour();
      }
    });

    return {
      disabledHours: () => {
        if (latestEndHour === -1) return [];
        return Array.from({ length: latestEndHour + 1 }, (_, i) => i);
      },
      disabledMinutes: () => [] // no minutes to disable
    };
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
      ],
      children: (
        <TimePicker.RangePicker
          size='small'
          format={'HH'}
          value={initialValue}
          id={{
            start: `${day}_${index}_startTime`,
            end: `${day}_${index}_endTime`,
          }}
          onChange={(times) => handleInputChange(day, index, times)}
          disabledTime={() => getDisabledHours(day, index, timeslotForm)}
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
    console.log(values);
    const tutorId = 1; // Example tutorId
    saveBecomeTutor(tutorId);
    saveAccountDetails(tutorId, values)
      .catch(error => {
        console.error('Error saving account details:', error);
      });

    next();
  };

  const handleDiplomaURLChange = (url: string) => {
    setDiplomaURL((prevState) => [...prevState, url])
  }
  const handleCertificateURLChange = (url: string) => {
    setCertURL((prevState) => [...prevState, url])
  }
  //-----------------------------FINISH EDUCATION FORM---------------------------------
  const onFinishEducationForm = (values: any) => {
    //get number of upload entries in form
    // const numberOfEntries = Math.max(
    //   ...Object.keys(values)
    //     .filter(key => key.includes('_'))
    //     .map(key => {
    //       const lastPart = key.split('_').pop();
    //       return lastPart ? parseInt(lastPart, 10) : 0;
    //     })
    // ) + 1;
    // console.log(diplomaFile)
    // for (let i = 0; i < numberOfEntries; i++) {
    //   console.log(diplomaFile[`diplomaVerification_${i}`][0])
    //   uploadImage(1, diplomaFile[`diplomaVerification_${i}`][0], 'diploma', handleDiplomaURLChange);
    //   let url = diplomaURL[i];
    //   values[`diplomaVerification_${i}`] = url;
    // }

    setEducationValues(values);
    console.log(values);
    // const tutorId = user?.userId;
    const tutorId = 1; // Example tutorId
    saveEducations(tutorId, values)
      .catch(error => {
        console.error('Error saving educations:', error);
      });
    next();
  };
  //----------------------------------FINISH CERTIFICATION FORM----------------------------
  const onFinishCertificationForm = (values: any) => {
    setCertificationValues(values);
    console.log(values);
    // const tutorId = user?.userId;
    const tutorId = 1; // Example tutorId
    saveCertificates(tutorId, values)
      .catch(error => {
        console.error('Error saving certificates:', error);
      });
    next();
  };
  //-----------------------------------FINISH DESCRIPTION FORM---------------------------
  const onFinishDescriptionForm = (values: any) => {
    setDescriptionValues(values);
    console.log(values);
    // const tutorId = user?.userId;
    const tutorId = 1; // Example tutorId
    saveTutorDescription(tutorId, values)
      .catch(error => {
        console.error('Error saving tutor description:', error);
      });
    next();
  };

  //---------------------------------FINISH TIMESLOT FORM-----------------------------
  const onFinishTimePriceForm = (values: any) => {
    setTimePriceValues(values);
    // console.log(
    //   aboutValues,
    //   educationValues,
    //   certificationValues,
    //   descriptionValues,
    //   timePriceValues
    // );
    console.log(values);
    // const tutorId = user?.userId;
    const tutorId = 1; // Example tutorId
    saveTutorAvailableTimeslots(tutorId, values)
      .catch(error => {
        console.error('Error saving tutor available timeslot:', error);
      });
    next();
  };

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
      diplomaFile={diplomaFile}
      onDiplomaFileChange={handleDiplomaChange}
      diplomaURL={diplomaURL}
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
    } catch (error: any) {
      api.error({
        message: 'Lỗi',
        description: error.response ? error.response.data : error.message,
      });
    }
  }
  //------------------------------------FETCH ACCOUNT DETAILS API----------------------------
  async function saveAccountDetails(tutorId: number, formData: any) {

    // Get JSON body from form data
    const jsonRequestBody = convertAccountDetailsFormData(formData);

    try {

      // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
      const responseData = await updateDetails(tutorId, jsonRequestBody);

      // Check response status
      if (!api.success) {
        throw new Error(`Error: ${responseData.statusText}`);
      }

      // Get response data
      console.log(' saved successfully:', responseData);

      // Return success response
      return responseData;
    } catch (error: any) {
      api.error({
        message: 'Lỗi',
        description: error.response ? error.response.data : error.message,
      });
    }
  }

  function convertAccountDetailsFormData(formData: any) {
    // convert form data to account details data
    return {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      dayOfBirth: formData.dayOfBirth.format('YYYY-MM-DD'), // Assuming dayOfBirth is a moment object
      gender: formData.gender,
      address: formData.address,
      avatarUrl: formData.avatarUrl
    };
  }
  //------------------------------------FETCH EDUCATION API----------------------------
  async function saveEducations(tutorId: number, formData: any) {

    // Get JSON body from form data
    const jsonRequestBody = convertEducationFormData(formData);

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
      return responseData;
    } catch (error: any) {
      api.error({
        message: 'Lỗi',
        description: error.response ? error.response.data : error.message,
      });
    }
  }


  function convertEducationFormData(formData: any) {
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
        diplomaUrl: formData[`diplomaVerification_${i}`] || formData.diplomaUrl
      };

      educationData.push(entry);
    }

    return educationData;
  }
  //------------------------------------FETCH CERTIFICATE API----------------------------
  async function saveCertificates(tutorId: number, formData: any) {

    // Get JSON body from form data
    const jsonRequestBody = convertCertificateFormData(formData);

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
      api.error({
        message: 'Lỗi',
        description: error.response ? error.response.data : error.message,
      });
    }
  }

  function convertCertificateFormData(formData: any) {
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
        certificateUrl: formData[`certificateUrl_${i}`] || formData.certificateUrl,
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
      api.error({
        message: 'Lỗi',
        description: error.response ? error.response.data : error.message,
      });
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
      api.error({
        message: 'Lỗi',
        description: error.response ? error.response.data : error.message,
      });
    }
  }

  function convertTimeslotsToJSON(formData: any) {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const jsonResult = [];

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
      <Title
        style={{
          color: `${theme.colors.primary}`,
          textTransform: `capitalize`,
        }}
      >
        Become our tutor!
      </Title>
      <div
        style={{
          margin: `30px 0px 20px`,
        }}
      >
        {/* disabled={isDisabled(0)} */}
        <Steps current={current} onChange={goTo}>
          <Steps.Step disabled={isDisabled(0)} title="About"></Steps.Step>
          <Steps.Step disabled={isDisabled(1)} title="Education"></Steps.Step>
          <Steps.Step
            disabled={isDisabled(2)}
            title="Certification"
          ></Steps.Step>
          <Steps.Step disabled={isDisabled(3)} title="Description"></Steps.Step>
          <Steps.Step
            disabled={isDisabled(4)}
            title="Availability & Pricing"
          ></Steps.Step>
        </Steps>
      </div>

      {step}
    </>
  );
}
