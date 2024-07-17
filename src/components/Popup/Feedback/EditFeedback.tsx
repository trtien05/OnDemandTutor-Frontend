import { Modal, Rate } from 'antd';
import React, { useState } from 'react'
import * as Styled from './Feedback.styled'
import TextArea from 'antd/es/input/TextArea';
import { EditOutlined } from '@ant-design/icons';

interface FeedbackProps {
  tutorName?: string;
  handleEditReview: (values: any) => void;
  initialValues: { rating: number; content: string; };

}
const EditFeedback: React.FC<FeedbackProps> = (props) => {
  const { tutorName, handleEditReview, initialValues } = props;
  const [isFormOpen, setIsFormOpen] = useState(false);

  function showModal() {
    setIsFormOpen(true);
  }

  const handleCancel = () => {
    setIsFormOpen(false);
  };
  const handleOk = () => {
    setIsFormOpen(false);
  };

  const handleFinish = (values: any) => {
    handleEditReview(values)
    setIsFormOpen(false);

  };
  return (
    <>
      <EditOutlined
        style={{
          fontSize: '20px',
          cursor: 'pointer',
          margin: '0 5px',
        }}
        onClick={showModal}
      />
      <Modal
        width={'700px'}
        open={isFormOpen}
        footer={null}
        closable={false}
        maskClosable={true}
        onOk={handleOk}
        onCancel={handleCancel}
        styles={
          {
            content: {
              borderRadius: '50px', padding: '50px', boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
            }
          }}
      >
        <Styled.FormWrapper
          name="review"
          onFinish={handleFinish}
          initialValues={initialValues}
        >
          <Styled.FormTitle>REVIEW TUTOR</Styled.FormTitle>

          <Styled.FormTitle style={{ margin: '0 auto' }}>Tutor Name: {tutorName}</Styled.FormTitle>

          <div style={{ display: 'flex', margin: '0 auto', maxWidth: '450px', }}>
            <Styled.FormTitle>Teaching quality: </Styled.FormTitle>
            <Styled.FormItem
              name="rating"
              rules={[{
                required: true,
                message: "Please rating",
              }]}
              style={{ margin: '0', marginLeft: '110px' }}>
              <Rate style={{ margin: '0' }} allowHalf />
            </Styled.FormItem>
          </div>
          <Styled.FormItem
            name="content"
            rules={[{
              required: true,
              max: 255,
              message: "Your feedback cannot exceed 255 characters.",
            }]}>
            <TextArea style={{ height: '150px', resize: 'none' }} placeholder="Please share your opinion with us!" />
          </Styled.FormItem>
          <Styled.FormItem>
            <Styled.GradientButton
              type="primary"
              htmlType="submit"
            // loading={loading}
            >
              Confirm
            </Styled.GradientButton>
          </Styled.FormItem>
        </Styled.FormWrapper>

      </Modal>
    </>

  )
}

export default EditFeedback;