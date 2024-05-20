
import {Form, Input, Button} from 'antd';

export default function Form3({onFinish, initialValues, onClickBack}:any) {
    
  return (
    <Form onFinish={onFinish} initialValues={initialValues} >
    <Form.Item label='Certificate' name={'certificateTutor'} rules={[{required:true,message:'Please enter your name'}]}>
    <Input />
    </Form.Item>
    <Form.Item label='Type' name={'certTypeTutor'} rules={[{required:true,message:'Please enter your middle name'}]}>
    <Input />  
    </Form.Item>
    <Button type="default" onClick={()=>onClickBack(1)}>Back</Button>
    <Button type='primary' htmlType="submit">Save and continue</Button>
  </Form>
  )
}
