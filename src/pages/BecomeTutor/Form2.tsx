import {
  Avatar,
  Col,
  UploadFile,
  notification,
  Button,
  Typography,
  Checkbox
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import Upload, { RcFile } from 'antd/es/upload';
import React, { useState, useRef } from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import type { GetProp, UploadProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { educationForm } from './Form.fields';
import { theme } from '../../themes';
import * as FormStyled from './Form.styled';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const { Title } = Typography;


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Form2 = ({ onFinish, initialValues, onClickBack }: any) => {
  useDocumentTitle('Become a tutor');

  //const file = useRef<UploadFile>();
  const file = useRef<RcFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [api, contextHolderNotification] = notification.useNotification({
    top: 100,
  });

  const beforeUpload = (f: FileType) => {
    // const isJpgOrPng = f.type === 'image/jpeg' || f.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = f.size / 1024 / 1024 < 5;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    // return isJpgOrPng && isLt2M;
    file.current = f;
    return false;
  };

  //MOCKUP
  const mockUpload = (file: RcFile): Promise<{ url: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate a server response with a generated URL
        const url = URL.createObjectURL(file);
        resolve({ url });
      }, 1000);
    });
  };

  const handleUploadAvatar = async (info: UploadChangeParam<UploadFile<any>>) => {
    setImageUrl(URL.createObjectURL(info.file as RcFile));
    if (!file.current) return;

    try {
      setLoading(true);

      //await uploadAvatar(customer.userInfo.userId, file.current as RcFile);
      const response = await mockUpload(file.current); // Use mock upload
      const uploadedUrl = response.url;
      setImageUrl(uploadedUrl);
      api.success({
        message: 'Upload successfully',
        description: '',
      });

      setReload(!reload);
    } catch (error: any) {
      api.error({
        message: 'Error',
        description: error.response ? error.response.data : error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }} style={{margin: `auto`}}>

      <FormStyled.FormWrapper
        labelAlign='left'
        layout='vertical'
        requiredMark='optional'
        size='middle'
        onFinish={onFinish}
        initialValues={initialValues}>
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>Education</FormStyled.FormTitle>
          <FormStyled.FormDescription>Tell students more about the higher education that you've completed or are working on.</FormStyled.FormDescription>

          {educationForm.map((field) => {
            return (
              <FormStyled.FormItem
                key={field.key}
                label={field.label}
                name={field.name}
                rules={field.rules}
                $width={field.$width ? field.$width : '100%'}
                initialValue={field.initialValue}
                validateFirst
              >
                {field.children}
              </FormStyled.FormItem>)
          })}


          <FormStyled.FormTitle>Profile picture</FormStyled.FormTitle>
          <FormStyled.FormDescription>Make a great first impression!<br />
            Tutors who look friendly and professional get the most students</FormStyled.FormDescription>

          <div style={{ margin: 'auto' }}>
            <ImgCrop
              quality={1}
              showReset
              showGrid
            >
              <Upload name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleUploadAvatar}>
                <Avatar
                  shape='square'
                  icon={<UserOutlined />}
                  size={100}
                  src={imageUrl}
                /></Upload>
            </ImgCrop>
          </div>

          <FormStyled.FormCheckbox required name='agreement' value='true'>By clicking Save and continue, I confirm that I’m over 18 years old. I also have read and agreed with the Terms and Condition.</FormStyled.FormCheckbox>
        </FormStyled.FormContainer>
        <Button type="default" onClick={() => onClickBack(1)}>Back</Button>
        <Button type="primary" htmlType="submit">Save and continue</Button>
      </FormStyled.FormWrapper>
    </Col>
  )
}

export default Form2;


