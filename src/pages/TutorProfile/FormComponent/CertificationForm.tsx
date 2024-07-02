import { Button, Form, Modal, UploadFile, notification } from "antd";
import useAuth from "../../../hooks/useAuth";
import { useCallback, useState } from "react";
import * as FormStyled from '../../../pages/BecomeTutor/Form.styled';
import { FieldType, certificateForm } from "../../BecomeTutor/Form.fields";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { uploadImage } from "../../../utils/UploadImg";
import { addCertificates } from "../../../utils/tutorRegisterAPI";

interface CertProps {
  tutorId: number;
  lastIndex?: number;
  isUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const CertificationForm: React.FC<CertProps> = (props) => {
  const tutorId = props.tutorId;
  const lastIndex = props.lastIndex;
  const [api, contextHolder] = notification.useNotification({
    top: 100,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  //---------------------------MODAL---------------------------
  function showModal() {
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };


  //--------------------------FORM--------------------
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [certificate, setCertificate] = useState<FieldType[][]>([
    certificateForm
  ]);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList.length > 0 ? [e.fileList[e.fileList.length - 1]] : [];
};
const onChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList([newFileList[newFileList.length - 1]]);
};

  // const handleFinish = (values: any) => {
  //     onFinish({ ...values, fileList })
  // }

  const handleAddCertificate = useCallback(() => {
    const newFieldKey = certificate.length * certificateForm.length;
    const newForm: FieldType[] = certificateForm.map((field) => ({
      key: field.key + newFieldKey,
      label: field.label,
      name: field.name,
      rules: field.rules,
      initialValue: field.initialValue,
      children: field.children,
      $width: field.$width,
    }));
    setCertificate((prevForm) => [...prevForm, newForm]);
    // console.log(form)
  }, [certificate.length]);

  const handleRemoveCertificate = useCallback((formIndex: number) => {
    if (certificate.length > 1) {
      setCertificate((prevForm) =>
        prevForm.filter((_, index) => index !== formIndex)
      );
    } else {
      alert("At least one form must be present.");
    }
  },
    [certificate.length]
  );

  const uploadCertificate = async (values: any) => {
    const urls: string[] = [];
    const handleChange = (url: string) => {
      urls.push(url);
    }
    //upload cert to firebase
    const certificateUploadPromises = [];
    const numberOfEntries2 = Math.max(
      ...Object.keys(values)
        .filter(key => key.includes('_'))
        .map(key => {
          const lastPart = key.split('_').pop();
          return lastPart ? parseInt(lastPart, 10) : 0;
        })
    ) + 1;
    for (let i = 0; i < numberOfEntries2; i++) {

      certificateUploadPromises.push(uploadImage(tutorId, values[`certificateVerification_${i}`][0].originFileObj, 'certificate',
        lastIndex ? lastIndex + i : i, handleChange));
    }

    await Promise.all(certificateUploadPromises);
    return urls;
  }

  const handleOk = async (values: any) => {
    setLoading(true); // Set loading state to true when form is submitted
    try {
      const urls: string[] = await uploadCertificate(values)
      await saveCertificate(tutorId, values, urls)
      api.success({
        message: 'Your certificate has been sent',
      });
      props.isUpdate(true)
    } catch (error: any) {
      api.error({
        message: 'Error submitting certificate',
        description: error.response.data.message || error.message || 'There was an issue with creating your booking. Please try again later.',
      });
    } finally {
      setLoading(false);
      setIsFormOpen(false);
    }

  };
  //-----------------------CONVERT FORM DATA-----------------------------
  async function saveCertificate(tutorId: number, formData: any, url: any) {

    // Get JSON body from form data
    const jsonRequestBody = convertCertificateFormData(formData, url);

    try {

      // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
      const responseData = await addCertificates(tutorId, jsonRequestBody);

      // Check response status
      if (!api.success) {
        throw new Error(`Error: ${responseData.statusText}`);
      }

      // Get response data
      console.log('Certificates saved successfully:', responseData);

      // Return success response
      return responseData;
    } catch (error: any) {
      api.error({
        message: 'Lỗi',
        description: error.response ? error.response.data : error.message,
      });
    }
  }


  function convertCertificateFormData(formData: any, url: any) {
    const certificateData = [];

    const numberOfEntries = Math.max(
      ...Object.keys(formData)
        .filter(key => key.includes('_'))
        .map(key => parseInt(key.split('_').pop() ?? '0'))
    ) + 1;

    for (let i = 0; i < numberOfEntries; i++) {
      const entry = {
        // convert form data to certificate json format
        subject: formData[`subject_${i}`] || formData.subject,
        certificateName: formData[`certificateName_${i}`] || formData.certificateName,
        description: formData[`description_${i}`] || formData.description,
        issuedBy: formData[`issuedBy_${i}`] || formData.issuedBy,
        issuedYear: formData[`issuedYear_${i}`].$y,
        certificateUrl: url[i] || formData.certificateUrl,
      };

      certificateData.push(entry);
    }

    return certificateData;
  }


  return (
    <>
      {contextHolder}
      <Button type="default" onClick={showModal} style={{ borderRadius: `6px`, fontWeight: `bold`, width: `150px` }}>
        Add certificates
      </Button>
      <Modal
        centered
        closable={false}
        width={'700px'}
        open={isFormOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        styles={
          {
            content: {
              borderRadius: '50px', padding: '50px', boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
            }
          }}
      >
        <FormStyled.FormWrapper
          id="certificateForm" //Adding the id to give the form a unique identifier, link the send button to the form
          form={form}
          labelAlign="left"
          layout="vertical"
          requiredMark="optional"
          size="middle"
          onFinish={handleOk}
        >
          <FormStyled.FormContainer>
            <FormStyled.FormTitle level={1} style={{ margin: `auto` }}>Certificate</FormStyled.FormTitle>

            {certificate.map((certificateForm: FieldType[], formIndex: number) => (
              <div>
                {formIndex > 0 && (
                  <Button
                    type="dashed"
                    style={{ width: `100%`, margin: `24px 0px` }}
                    onClick={() => handleRemoveCertificate(formIndex)}
                  >
                    Remove
                  </Button>
                )}
                <FormStyled.FormContainer key={formIndex}>

                  {certificateForm.map((field) => {
                    const certificateVerificationProps = field.name.includes('certificateVerification')
                      ? {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      }
                      : {};
                    return (
                      <FormStyled.FormItem
                        key={field.key + '_' + formIndex}
                        label={field.label}
                        name={field.name + '_' + formIndex}
                        rules={field.rules}
                        $width={field.$width ? field.$width : "100%"}
                        initialValue={field.initialValue}
                        {...certificateVerificationProps}
                        validateFirst
                      >
                        {field.name.includes(`certificateVerification`) &&
                          (<Dragger
                            name={field.name + "_" + formIndex}
                            fileList={fileList}
                            listType="picture"
                            showUploadList={true}
                            onChange={onChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                            beforeUpload={() => false} // Prevent upload by return false
                          >
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single image (JPG/PNG) or PDF file.</p>
                          </Dragger>)}
                        {field.children}
                      </FormStyled.FormItem>
                    )
                  })}
                </FormStyled.FormContainer>
              </div>
            ))}
            <Button type="dashed" onClick={handleAddCertificate}>
              Add another certificate
            </Button>
          </FormStyled.FormContainer>
          <FormStyled.ButtonDiv>
            <Button key="Cancel" type="default" onClick={handleCancel} style={{ marginRight: '5%', width: '45%' }}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              form='certificateForm'
              style={{ width: '45%' }}
            >
              Save
            </Button>
          </FormStyled.ButtonDiv>
        </FormStyled.FormWrapper>
      </Modal>
    </>
  );
};

export default CertificationForm;