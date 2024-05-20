
import {Form, Input, Button} from 'antd';

export default function Form1({onFinish, initialValues}:any) {
  return(
    <Form onFinish={onFinish} initialValues={initialValues} >
    <Form.Item label='Name' name={'nameTutor'} rules={[{required:true,message:'Please enter your name'}]}>
    <Input />
    </Form.Item>
    <Form.Item label='Middle Name' name={'middleNameTutor'} rules={[{required:true,message:'Please enter your middle name'}]}>
    <Input />  
    </Form.Item>
    <Button type='primary' htmlType="submit">Save and continue</Button>
  </Form>
  )
}
