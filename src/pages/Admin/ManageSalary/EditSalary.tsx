import { Button, Form, Modal, Select, Tooltip, notification, Row, Col, Checkbox, Input } from 'antd';
import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { theme } from '../../../themes';
import { changeWithdrawRequest } from '../../../utils/salaryAPI';

interface Record {
  id: number;
  bankAccountNumber?: string;
  bankAccountOwner?: string;
  bankName?: string;
  month?: number;
  year?: number;
  amount: number;
  status?: string;
}

interface EditProps {
  record: Record;
  onReload: () => void;
}

const EditSalary: React.FC<EditProps> = ({ record, onReload }) => {
  const [apiNoti, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [agreement, setAgreement] = useState(false);
  const [status, setStatus] = useState(record.status || '');


  const rules = {
    required: true,
    message: 'This field is required!',
  };

  const charLimitRule = [
    {
      required: true,
      max: 255,
      message: 'This field cannot exceed 255 characters.',
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

    const payload = {
      withdrawRequestId: record.id,
      updatedStatus: values.updatedStatus,
      ...(values.updatedStatus === 'REJECTED' && { rejectReason: values.rejectReason })
    };
    try {
      const response = await changeWithdrawRequest(payload);
      if (response.status === 200) {
        apiNoti.success({
          message: "Update Successful",
          description: `Successfully updated : ${record.bankAccountOwner}`
        });
        setTimeout(() => {
          onReload();
          setIsModalOpen(false);
        }, 1000);
      }
    } catch (error: any) {
      apiNoti.error({
        message: "Update Failed",
        description: ` ${error.response.data.message}`
      });
    }
  }
  const handleStatusChange = (value: string) => {
    setStatus(value);
  };
  return (
    <>
      {contextHolder}
      <Tooltip title='Confirm Salary Request'>
        <Button icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title={`Confirm Salary Request: ${record.bankAccountOwner}`}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        width={800}
      >
        <Form
          onFinish={handleFinish}
          initialValues={{
            updatedStatus: record.status,
          }}
          form={form}
          layout="vertical"
        >


          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='updatedStatus'
                label='Status'
                rules={[rules]}
              >
                <Select onChange={handleStatusChange}>
                  <Select.Option value='DONE'>DONE</Select.Option>
                  <Select.Option value='PROCESSING'>PROCESSING</Select.Option>
                  <Select.Option value='REJECTED'>REJECTED</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {status === 'REJECTED' && (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name='rejectReason'
                  label='Rejection Reason'
                  rules={charLimitRule}
                >
                  <Input.TextArea rows={4} style={{ resize: 'none' }} />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[{
                  validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree before submitting'))
                }]}
              >
                <Checkbox
                  name='agreement'
                  checked={agreement}
                  defaultChecked={agreement}
                  style={{ margin: `20px 0`, color: `${theme.colors.black}`, fontWeight: `bold` }}
                  onChange={(e) => setAgreement(e.target.checked)}
                >I have carefully read all related information in this question</Checkbox>
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
      </Modal >
    </>
  );
}

export default EditSalary;
