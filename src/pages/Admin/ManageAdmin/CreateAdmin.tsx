import { Form, Button, notification, Row, Col } from 'antd';
import { loginFields } from '../../../components/AuthForm/AuthForm.fields'
import { createAdmin } from '../../../utils/accountAPI';
import { useState } from 'react';


const CreateAdmin = () => {
  const [apiNoti, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);

    try {
      const response = await createAdmin(values);
      if (response.status === 200) {
        form.resetFields();
        apiNoti.success({
          message: "Success",
          description: `Created Successful`
        });
      } else {
        apiNoti.error({
          message: "Failed",
          description: `Created Fail`
        });
      }
    } catch (error: any) {
      apiNoti.error({
        message: "Error",
        description: ` ${error.response.data.message}`
      });
    } finally {
      setLoading(false);
    }

  }
  return (
    <div>
      {contextHolder}
      <h2>Create Admin</h2>
      <Form
        style={{ marginTop: '20px' }}
        onFinish={handleFinish}
        form={form}
      >
        <Row gutter={16}>
          <Col span={12}>
            {loginFields.map((field) => (
              <Form.Item
                key={field.key}
                label={field.label}
                name={field.name}
                rules={field.rules}
                validateFirst
              >
                {field.children}
              </Form.Item>
            ))}

          </Col>

        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </div>
  );
}

export default CreateAdmin