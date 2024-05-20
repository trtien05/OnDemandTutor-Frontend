
import {Form, Input, Button} from 'antd';

export default function Form5({onFinish, initialValues, onClickBack}:any) {
    
  return (
    <Form onFinish={onFinish} initialValues={initialValues} >
    <Form.Item label='Price' name={'priceTutor'} rules={[{required:true,message:'Please enter your price'}]}>
    <Input />
    </Form.Item>
    <Button type="default" onClick={()=>onClickBack(1)}>Back</Button>
    <Button type='primary' htmlType="submit">Complete registration</Button>
  </Form>
  )
}
