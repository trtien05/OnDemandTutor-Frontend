import { Modal, Rate, notification } from 'antd';
import React, { useState } from 'react'
import * as Styled from './Feedback.styled'
import TextArea from 'antd/es/input/TextArea';
import { postTutorReviews } from '../../../utils/tutorAPI';

interface FeedbackProps {
  tutorId: number;
  tutorName?: string;
  tutorFeedback?: boolean;
  onReload: () => void;
}
const Feedback: React.FC<FeedbackProps> = (props) => {
  const { tutorId, tutorName, tutorFeedback, onReload } = props;
  const [api, contextHolder] = notification.useNotification({
    top: 100,
  });
  const [review, setReview] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function showModal() {
    if (review) {
      api.warning({
        message: 'You Already Submitted Feeback',
        description: 'You have already submitted your feedback.',
      });
    } else if (!tutorFeedback) {
      api.warning({
        message: 'Not Registered with Tutor',
        description: 'You cannot provide feedback.',
      });
    }
    else {
      setIsFormOpen(true);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };
  const handleOk = () => {
    setIsFormOpen(false);
  };
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    const updatedValues = { ...values, isBanned: true };
    setLoading(true);
    try {
      const { data } = await postTutorReviews(tutorId, updatedValues);
      if (!data) {
        throw new Error("Error fetching tutor data");
      } else {
        onReload();
        api.success({
          message: 'Success',
          description: 'Feedback submitted successfully!',
        });
        setReview(true);
        setIsFormOpen(false);
      }
    } catch (error: any) {
      api.error({
        message: 'Error',
        description: error.message || 'Failed to submit feedback. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <div onClick={showModal} style={{ border: 'none', cursor: 'pointer', color: '#B94AB7' }}>
        FeedBack
      </div>
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
              loading={loading}
            >
              Confirm
            </Styled.GradientButton>
          </Styled.FormItem>
        </Styled.FormWrapper>

      </Modal>
    </>

  )
}

export default Feedback;