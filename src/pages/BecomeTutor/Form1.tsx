import {
  Avatar,
  Col,
  UploadFile,
  notification,
  Typography,
  Button,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import Upload, { RcFile } from 'antd/es/upload';
import { useState, useRef, useEffect } from 'react';
import { UploadChangeParam } from 'antd/lib/upload';
import type { GetProp, UploadProps } from 'antd';
import { aboutForm } from './Form.fields';
import { theme } from '../../themes';
import * as FormStyled from './Form.styled';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const { Title } = Typography;
//Using the Form1Props interface ensures type safety and clarity, 
//making it easier to understand what props the Form1 component expects and how they should be used.
interface Form1Props {
  agreement: boolean;
  onAgreementChange: (checked: boolean) => void;
  onFinish: (values: any) => void;
  initialValues: any;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const Form1: React.FC<Form1Props> = ({ agreement, onAgreementChange, onFinish, initialValues }: any) => {
  useDocumentTitle('Become a tutor');

  //const file = useRef<UploadFile>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [agreement, setAgreement] = useState<boolean>(false)
  const file = useRef<RcFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(null);
  // const isCheckedBox = useRef<boolean>(agreement);
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

  const handleUploadAvatar = async (info: UploadChangeParam<UploadFile<any>>) => {
    setImageUrl(URL.createObjectURL(info.file as RcFile));
    const newFileList = info.fileList.slice(-1); // Keep only the latest file
    setFileList(newFileList);

    if (info.file.status === 'done' || info.file.status === 'removed') {
      const file = newFileList[0]?.originFileObj;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImageUrl(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setImageUrl(null);
      }
    }


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
      console.log(fileList);
    }
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

  // Effect to simulate file upload for testing
  useEffect(() => {
    // Create a mock file object
    const mockFile: UploadFile = {
      uid: '-1',
      name: 'example.png',
      status: 'done',
      url: 'https://via.placeholder.com/100',
    };

    // Update fileList and imageUrl with the mock file
    setFileList([mockFile]);
    setImageUrl(mockFile.url);
  }, []);




  return (
    <Col lg={{ span: 12 }} sm={{ span: 16 }} xs={{ span: 24 }} style={{ margin: `auto` }}>

      <FormStyled.FormWrapper
        labelAlign='left'
        layout='vertical'
        requiredMark='optional'
        size='middle'
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <FormStyled.FormContainer>
          <FormStyled.FormTitle level={1}>About</FormStyled.FormTitle> <br />
          <FormStyled.FormDescription>Start creating your public tutor profile. Your progress will be automatically saved as you complete each section. You can return at any time to finish your registration.</FormStyled.FormDescription>

          {aboutForm.map((field) => {
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


          <FormStyled.FormTitle style={{ display: `block` }}>Profile picture</FormStyled.FormTitle> <br />
          <FormStyled.FormDescription>Make a great first impression!<br />
            Tutors who look friendly and professional get the most students</FormStyled.FormDescription>
          <br />
          <FormStyled.FormContainer style={{ margin: 'auto' }}>
            <FormStyled.FormItem
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={e => e && e.fileList}
              rules={[{ required: false, message: 'Please upload an avatar!' }]}>
              <ImgCrop
                quality={1}
                showReset
                showGrid
              >
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  fileList={fileList}
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
            </FormStyled.FormItem>
          </FormStyled.FormContainer>
          <FormStyled.FormItem
            name='agreement'
            valuePropName="checked"
            rules={[{
              required: true,
              message: 'You must agree to our Terms and Condition to proceed'
            }]}
          >
            <FormStyled.FormCheckbox
              name='agreement'
              style={{ margin: `0px` }}
              checked={agreement}
              onChange={(e) => onAgreementChange(e.target.checked)}
            // checked={isCheckedBox.current}
            // onChange={(e) => setAgreement(e.target.checked)}
            >By clicking Save and continue, I confirm that I’m over 18 years old. I also have read and agreed with the <a href='#' style={{ textDecoration: 'underline' }}>Terms and Condition</a>.</FormStyled.FormCheckbox>
          </FormStyled.FormItem>


        </FormStyled.FormContainer>
        {(agreement &&
          <FormStyled.ButtonDiv>
            <Button type='primary' htmlType="submit" >Save and continue</Button>
          </FormStyled.ButtonDiv>)}
      </FormStyled.FormWrapper>
    </Col>
  )
}

export default Form1