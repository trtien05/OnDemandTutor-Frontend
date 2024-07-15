import { Button, Form, Input, Modal, Select, Tooltip, notification, Row, Col } from 'antd';
import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { updateAccount } from '../../../utils/accountAPI';

interface Record {
  id: number;
  fullName?: string;
  gender?: boolean;
  address?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  createAt?: string;
  status?: string;
}

interface EditProps {
  record: Record;
  onReload: () => void;
}

const EditStudent: React.FC<EditProps> = ({ record, onReload }) => {
  const [apiNoti, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const rules = {
    required: true,
    message: 'This field is required!',
  };

  const phoneRules = [
    {
      required: true,
      pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
      message: 'Please enter the correct phone number format.',
    },
  ];

  const charLimitRule = [
    {
      required: true,
      max: 50,
      message: 'This field cannot exceed 50 characters.',
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = async (values: any) => {
    if (values.dateOfBirth) {
      values.dateOfBirth = values.dateOfBirth.format('YYYY-MM-DD');
    }
    try {
      const response = await updateAccount(record.id, values);
      if (response.status === 200) {
        apiNoti.success({
          message: "Update Successful",
          description: `Successfully updated : ${record.fullName}`
        });
        onReload();
        setIsModalOpen(false);
      }
    } catch (error: any) {
      apiNoti.error({
        message: "Update Failed",
        description: ` ${error.response.data.message}`
      });
    }

  }

  return (
    <>
      {contextHolder}
      <Tooltip title='Edit Account'>
        <Button icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title={`Edit Account: ${record.fullName}`}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        width={800}
      >
        <Form
          onFinish={handleFinish}
          initialValues={{
            ...record,
            gender: record.gender ? 'true' : 'false',
          }}
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='fullName'
                label='Full Name'
                rules={charLimitRule}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='gender'
                label='Gender'
                rules={[rules]}
              >
                <Select>
                  <Select.Option value='true'>Female</Select.Option>
                  <Select.Option value='false'>Male</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='address'
                label='Address'
                rules={charLimitRule}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='email'
                label='Email'
                rules={[{ type: 'email', message: 'Please enter a valid email!' }, ...charLimitRule]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='status'
                label='Status'
                rules={[rules]}
              >
                <Select>
                  <Select.Option value='ACTIVE'>ACTIVE</Select.Option>
                  <Select.Option value='PROCESSING'>PROCESSING</Select.Option>
                  <Select.Option value='BANNED'>BANNED</Select.Option>
                  <Select.Option value='UNVERIFIED'>UNVERIFIED</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='phoneNumber'
                label='Phone Number'
                rules={phoneRules}
              >
                <Input />
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default EditStudent;
