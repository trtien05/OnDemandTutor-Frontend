
import {Form, Input, Button} from 'antd';

export default function Form4({onFinish, initialValues, onClickBack}:any) {
    
  return (
    <Form onFinish={onFinish} initialValues={initialValues} >
    <Form.Item label='Description' name={'descriptionTutor'} rules={[{required:true,message:'Please enter your description'}]}>
    <Input />
    </Form.Item>
    <Button type="default" onClick={()=>onClickBack(1)}>Back</Button>
    <Button type='primary' htmlType="submit">Save and continue</Button>
  </Form>
  )
}
