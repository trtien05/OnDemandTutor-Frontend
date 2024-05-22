import { Steps, Typography } from "antd";
import * as FormStyled from "./TutorForm1/Register.styled"
import { useState } from "react";
// import Form1 from "./Form1";
import TutorForm4 from "./TutorForm4/TutorForm4";
import Register from "./TutorForm1/TutorForm1";
import Form2 from "./Form2";
import MultipleSteps from "./MultipleSteps";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";
import { theme } from "../../themes"
export default function FirstPage() {
  const [aboutValues, setAboutValues] = useState(null);
  const [educationValues, setEducationValues] = useState(null);
  const [certificationValues, setCertificationValues] = useState(null);
  const [descriptionValues, setDescriptionValues] = useState(null);
  const [timePriceValues, setTimePriceValues] = useState(null);
  
  const {Title} = Typography;
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
  const onFinishDescriptionForm = (values: any) => {
    setDescriptionValues(values);
    next();
  };
  const onFinishTimePriceForm = (values: any) => {
    setTimePriceValues(values);
    console.log(aboutValues,educationValues,certificationValues,descriptionValues,timePriceValues)
    next();
  };
  const onClickBack = () => {
    back()
  }
  const { current, back, step, next, goTo } = MultipleSteps([
    // <Form1 onFinish={onFinishAboutForm} initialValues={aboutValues} />,
    <Register onFinish={onFinishAboutForm} initialValues={aboutValues} />,
    <Form2 onFinish={onFinishEducationForm} initialValues={educationValues} onClickBack={onClickBack} />,
    <Form3 onFinish={onFinishCertificationForm} initialValues={certificationValues} onClickBack={onClickBack}/>,
    <TutorForm4 onFinish={onFinishDescriptionForm} initialValues={educationValues} onClickBack={onClickBack}/>,
    // <Form4 onFinish={onFinishDescriptionForm} initialValues={descriptionValues} onClickBack={onClickBack}/>,
    <Form5 onFinish={onFinishTimePriceForm} initialValues={timePriceValues} onClickBack={onClickBack}/>
  ]);
  
  const isDisabled = (stepNumber: number) => {
    {
      /*Disable next step until previous step done*/
    }
    if (stepNumber == 0) {
      return false;
    }
    if (stepNumber == 1) {
      return aboutValues === null;
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
    if (stepNumber == 4 ) {
      return (aboutValues === null || 
      educationValues === null ||
      certificationValues === null ||
      descriptionValues === null
      );
    }
  };

  return (
    <>
      <Title
        style={{ color: `${theme.colors.primary}`, textTransform: `capitalize`}}>Become our tutor!
        </Title>
        <div style={
          {
            margin:`30px 0px 20px`
          }
        }>
          <Steps current={current} onChange={goTo}>
            <Steps.Step disabled={isDisabled(0)} title="About"></Steps.Step>
            <Steps.Step disabled={isDisabled(1)} title="Education"></Steps.Step>
            <Steps.Step disabled={isDisabled(2)} title="Certification"></Steps.Step>
            <Steps.Step disabled={isDisabled(3)} title="Description"></Steps.Step>
            <Steps.Step disabled={isDisabled(4)} title="Availability & Pricing"></Steps.Step>
          </Steps>
        </div>
      
      {step}
      
    </>
  );
}
