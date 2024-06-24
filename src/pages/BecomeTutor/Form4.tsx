import { Row, Col, Checkbox, Button, Input } from "antd";

import React, { useState } from "react";

import * as FormStyled from "./Form.styled";
import { CommentInput } from "./Form.styled";
import ReactPlayer from "react-player";

const TutorForm4 = ({ onFinish, initialValues, onClickBack }: any) => {
  const [url, setUrl] = useState<string>("");
  const [priceValue, setPriceValue] = useState<string>("");
  const isValidYouTubeUrl = (url: string): boolean => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return regex.test(url);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    if (isValidYouTubeUrl(url)) {
      setUrl(url);
    } else {
      setUrl("");
    }
  };
  const onChange = (value: number | string | null) => {
    if (typeof value === "string") {
      setPriceValue(value);
    } else if (value === null) {
      setPriceValue("");
    } else {
      setPriceValue(value.toString());
    }
  };
  const formatNumberValue = (value: number | string): number => {
    if (typeof value === "string") {
      // Remove non-digit characters from the string
      const numericString = value.replace(/\D/g, "");
      // Convert the cleaned string to a number
      return parseFloat(numericString);
    } else {
      // If the value is already a number, return it directly
      return value;
    }
  };
  const formatter = (value: number | string | undefined) => {
    if (!value) return "";
    // Use the helper function to ensure value is a number
    const numberValue = formatNumberValue(value);
    // Use Intl.NumberFormat for Vietnamese locale
    const formattedValue = new Intl.NumberFormat("vi-VN").format(numberValue);
    return formattedValue;
  };
  const parser = (value: string | undefined) => {
    // Remove non-digit characters (commas, spaces, etc.)
    return value ? value.replace(/\D/g, "") : "";
  };

  const options = [
    { label: "Mathematics", value: "Mathematics" },
    { label: "Chemistry", value: "Chemistry" },
    { label: "Biology", value: "Biology" },
    { label: "Literature", value: "Literature" },
    { label: "English", value: "English" },
    { label: "IELTS", value: "IELTS" },
    { label: "TOEFL", value: "TOEFL" },
    { label: "TOEIC", value: "TOEIC" },
    { label: "Physics", value: "Physics" },
    { label: "Geography", value: "Geography" },
    { label: "History", value: "History" },
    { label: "Coding", value: "Coding" },
  ];
  return (
    <Col
      lg={{ span: 12 }}
      sm={{ span: 16 }}
      xs={{ span: 24 }}
      style={{ margin: `auto` }}
    >
      <FormStyled.FormWrapper
        onFinish={onFinish}
        initialValues={initialValues}
        labelAlign="left"
        layout="vertical"
        requiredMark="optional"
        size="middle"
      >
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>Subject Taught</FormStyled.FormTitle>
          <br />
          <FormStyled.FormItem name="checkedValues" $width={"100%"} rules={[{ required: true, message: 'Please choose a subject' }]}>
            <FormStyled.CheckboxGroup>
              <Row>
                {options.map(option => (
                  <Col lg={{ span: 6 }} sm={{ span: 8 }} xs={{ span: 8 }} key={option.value}>
                    <Checkbox value={option.value}>{option.label}</Checkbox>
                  </Col>
                ))}
              </Row>
            </FormStyled.CheckboxGroup>
          </FormStyled.FormItem>
          <div>
            <FormStyled.FormTitle>Hourly base rate</FormStyled.FormTitle>
            <FormStyled.FormDescription>
              You can change your base rate in settings after approval
            </FormStyled.FormDescription>
          </div>

          <FormStyled.FormItem
            $width={"100%"}
            name="amount"
            label="Amount in VND"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
                max: 1000000
              },
            ]}>
            <FormStyled.NumberInput
              style={{ width: '100%' }}
              placeholder="100,000"
              value={priceValue}
              formatter={formatter}
              parser={parser}
              onChange={onChange}
            >
            </FormStyled.NumberInput>
          </FormStyled.FormItem>
          <FormStyled.FormDescription>
            We will charge a 15% commission fee on each lesson. This fee is for the maintenance of the platform and marketing purposes.
            The remaining will be transferred automatically to your bank account every 28 days.
          </FormStyled.FormDescription>

          <FormStyled.FormTitle>Profile description</FormStyled.FormTitle>
          <FormStyled.FormDescription>
            Show potential students who you are! Share your teaching experience
            and passion for education and briefly mention your interests and
            hobbies.
          </FormStyled.FormDescription>
          <FormStyled.FormItem name="description" $width={"100%"}>
            <CommentInput rows={6} placeholder="Tell us about yourself..." />
          </FormStyled.FormItem>

          <FormStyled.FormTitle>Google Meet Link</FormStyled.FormTitle>
          <FormStyled.FormDescription>
            Create your Google Meet link. You can change your link in settings later.
          </FormStyled.FormDescription>

          <FormStyled.FormItem
            name="meetingLink"
            $width={"100%"}
            rules={[
              {
                pattern:
                  /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}(?:\?pli=1)?$/,
                message: "Invalid Google Meet link.",
              },
              {
                required: true,
                message: "Please provide your Google Meet link.",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Paste your Google Meet link"
            ></Input>
          </FormStyled.FormItem>
          <FormStyled.FormDescription>
            By providing a Google Meet link directly on the My Tutor platform, students can join your virtual classroom with a single click.
            This convenience enhances their learning experience and reduces the chances of miscommunication or missed sessions.
          </FormStyled.FormDescription>


          <FormStyled.FormTitle>Video introduction</FormStyled.FormTitle>
          <FormStyled.FormDescription>
            Introduce yourself to students through a video. Remember to greet
            your students warmly and invite them to book a lesson.
          </FormStyled.FormDescription>
          <FormStyled.FormItem
            name="youtubeLink"
            $width={"100%"}
            rules={[
              {
                pattern:
                  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
                message: "Invalid Youtube link.",
              },
            ]}
          >
            <Input
              onChange={handleInputChange}
              type="text"
              placeholder="Paste a Youtube link to your video"
            ></Input>
          </FormStyled.FormItem>
          {url && (
            // style={{ width: "100%", height: "100%", display: "flex" }}
            <div style={{ width: "100%", margin: "10px 0 20px 0" }}>
              <ReactPlayer url={url} controls={true} width="100%" />
            </div>
          )}
          <FormStyled.ButtonDiv>
            <Button type="default" onClick={() => onClickBack(1)} >Back</Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: `24px` }}>
              Save and continue
            </Button>
          </FormStyled.ButtonDiv>


        </FormStyled.FormContainer>
      </FormStyled.FormWrapper>
    </Col>
  );
};

export default TutorForm4;
