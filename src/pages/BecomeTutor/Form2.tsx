
import {Form, Button, Input } from "antd";

export default function Form2({ onFinish, initialValues, onClickBack }: any) {
  
  return (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
        label="School"
        name="schoolTutor"
        rules={[{ required: true, message: "Please enter your school" }]}
      >
        <Input />
      </Form.Item>
      <Button type="default" onClick={()=>onClickBack(1)}>Back</Button>
      <Button type="primary" htmlType="submit">Save and continue</Button>
    </Form>
  );
}
