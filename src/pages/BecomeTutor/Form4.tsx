import { Row, Col, Checkbox, Button, Input } from "antd";

import React, { useState } from "react";

import * as FormStyled from "./Form.styled";
import { CommentInput, ButtonDiv } from "./Form.styled";
import ReactPlayer from "react-player";
//import useDocumentTitle from '../../hooks/useDocumentTitle';

const TutorForm4 = ({ onFinish, initialValues, onClickBack }: any) => {
  const [url, setUrl] = useState<string>("");
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
    { label: "Information Technology", value: "Information Technology" },
  ];
  return (
    <Col lg={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
      <FormStyled.FormWrapper
        onFinish={onFinish}
        initialValues={initialValues}
        labelAlign="left"
        layout="vertical"
        requiredMark="optional"
        size="middle"
      >
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>Subject Taught</FormStyled.FormTitle>{" "}
          <br />
          <FormStyled.FormItem name="checkedValues" $width={"100%"}>
          <FormStyled.CheckboxGroup>
            <Row>
                {options.map(option => (
                  <Col span={6} key={option.value}>
                    <Checkbox value={option.value}>{option.label}</Checkbox>
                  </Col>
                ))}
              </Row>
          </FormStyled.CheckboxGroup>
          </FormStyled.FormItem>
          <FormStyled.FormTitle>Profile description</FormStyled.FormTitle>
          <FormStyled.FormDescription>
            Show potential students who you are! Share your teaching experience
            and passion for education and briefly mention your interests and
            hobbies.
          </FormStyled.FormDescription>
          <FormStyled.FormItem name="description" $width={"100%"}>
            <CommentInput rows={6} placeholder="Tell us about yourself..." />
          </FormStyled.FormItem>
          <FormStyled.FormTitle>Video introduction</FormStyled.FormTitle>
          <FormStyled.FormDescription>
            Introduce yourself to students through a 30 seconds - 2 minutes
            video. Remember to greet your students warmly and invite them to
            book a lesson.
          </FormStyled.FormDescription>
          <FormStyled.FormItem
            name="youtubeLink"
            $width={"100%"}
            rules={[
              {
                pattern:
                  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
                message: 'Invalid Youtube link.'
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
            <div style={{ width: "100%", marginTop: "10px" }}>
              <ReactPlayer url={url} controls={true} width="100%" />
            </div>
          )}
          <ButtonDiv>
          <Button type="default" onClick={()=>onClickBack(1)}>Back</Button>
          <Button type="primary" htmlType="submit">
            Save and continue
          </Button>
          </ButtonDiv> 
          
          
        </FormStyled.FormContainer>
      </FormStyled.FormWrapper>
    </Col>
  );
};

export default TutorForm4;
