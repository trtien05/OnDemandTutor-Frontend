import { Button, Form, Modal, UploadFile, notification } from "antd";
import { useState } from "react";
import * as FormStyled from '../../../BecomeTutor/Form.styled';
import { FieldType, educationForm } from "../../../BecomeTutor/Form.fields";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { addEducations } from "../../../../utils/tutorRegisterAPI";
import { uploadImage } from "../../../../utils/UploadImg";

interface EducationProps {
    tutorId: number;
    lastIndex?: number;
    isUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const EducationForm: React.FC<EducationProps> = (props) => {
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
    const [diploma, setDiploma] = useState<FieldType[][]>([
        educationForm
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

    const handleAddDiploma = () => {
        const newFieldKey = diploma.length * educationForm.length;
        const newForm: FieldType[] = educationForm.map((field) => ({
            key: field.key + newFieldKey,
            label: field.label,
            name: field.name,
            rules: field.rules,
            initialValue: field.initialValue,
            children: field.children,
            $width: field.$width,
        }));
        setDiploma([...diploma, newForm]);
        // console.log(form)
    };

    const handleRemoveDiploma = (formIndex: number) => {
        if (diploma.length > 1) {
            setDiploma(diploma.filter((_, index) => index !== formIndex));
        } else {
            alert("At least one form must be present.");
        }
    };


    const uploadDiploma = async (values: any) => {
        //upload diploma to firebase
        const numberOfEntries1 = Math.max(
            ...Object.keys(values)
                .filter(key => key.includes('_'))
                .map(key => {
                    const lastPart = key.split('_').pop();
                    return lastPart ? parseInt(lastPart, 10) : 0;
                })
        ) + 1;
        const diplomaUploadPromises = [];
        const urls: string[] = [];

        const handleChange = (url: string) => {
            urls.push(url);
        }
        for (let i = 0; i < numberOfEntries1; i++) {
            if (lastIndex)
                diplomaUploadPromises.push(uploadImage(tutorId, values[`diplomaVerification_${i}`][0].originFileObj, 'diploma', lastIndex ? lastIndex + i : i, handleChange));
        }
        await Promise.all(diplomaUploadPromises);
        return urls;
    }

    const handleOk = async (values: any) => {
        setLoading(true); // Set loading state to true when form is submitted
        try {
            const urls: string[] = await uploadDiploma(values)
            await saveEducations(tutorId, values, urls)
            api.success({
                message: 'Your diploma has been sent',
            });
            props.isUpdate(true)
        } catch (error: any) {
            api.error({
                message: 'Error submitting diploma',
                description: error.response.data.message || error.message || 'There was an issue with creating your booking. Please try again later.',
            });
        } finally {
            setLoading(false);
            setIsFormOpen(false);
        }

    };
    //-----------------------CONVERT FORM DATA-----------------------------
    async function saveEducations(tutorId: number, formData: any, url: any) {
        // Get JSON body from form data
        const jsonRequestBody = convertEducationFormData(formData, url);

        try {

            // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
            const responseData = await addEducations(tutorId, jsonRequestBody);

            // Check response status
            if (!api.success) {
                throw new Error(`Error: ${responseData.statusText}`);
            }

            // Get response data
            console.log('Educations saved successfully:', responseData);

            // Return success response
            return responseData;
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        }
    }


    function convertEducationFormData(formData: any, url: any) {
        const educationData = [];

        const numberOfEntries = Math.max(
            ...Object.keys(formData)
                .filter(key => key.includes('_'))
                .map(key => parseInt(key.split('_').pop() ?? '0'))
        ) + 1;

        for (let i = 0; i < numberOfEntries; i++) {
            const entry = {
                majorName: formData[`majorName_${i}`] || formData.majorName,
                specialization: formData[`specialization_${i}`] || formData.specialization,
                universityName: formData[`universityName_${i}`] || formData.universityName,
                degreeType: formData[`degreeType_${i}`] || formData.degreeType,
                startYear: formData[`academicYear_${i}`][0].$y,
                endYear: formData[`academicYear_${i}`][1].$y,
                diplomaUrl: url[i] || formData.diplomaUrl || ""
            };

            educationData.push(entry);
        }

        return educationData;
    }


    return (
        <>
            {contextHolder}
            <Button type="default" onClick={showModal} style={{ borderRadius: `6px`, fontWeight: `bold`, width: `150px` }}>
                Add diploma
            </Button>
            <Modal
                centered
                closable={false}
                width={'700px'}
                open={isFormOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[<FormStyled.ButtonDiv>
                    <Button key="Cancel" type="default" onClick={handleCancel} style={{ marginRight: '5%', width: '45%' }}>
                        Cancel
                    </Button>
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        form='educationForm'
                        style={{ width: '45%' }}
                    >
                        Save
                    </Button>
                </FormStyled.ButtonDiv>,]}
                styles={
                    {
                        content: {
                            borderRadius: '50px', padding: '50px', boxShadow: '-3px 7px 71px 30px rgba(185, 74, 183, 0.15)'
                        }
                    }}
            >
                <FormStyled.FormWrapper
                    id="educationForm" //Adding the id to give the form a unique identifier, link the send button to the form
                    form={form}
                    labelAlign="left"
                    layout="vertical"
                    requiredMark="optional"
                    size="middle"
                    onFinish={handleOk}
                >
                    <FormStyled.FormContainer>
                        <FormStyled.FormTitle level={1} style={{ margin: `auto` }}>Education Diploma</FormStyled.FormTitle>

                        {diploma.map((form: FieldType[], formIndex: number) => (
                            <div>
                                {formIndex > 0 && (
                                    <Button
                                        type="dashed"
                                        style={{ width: `100%`, margin: `24px 0px` }}
                                        onClick={() => handleRemoveDiploma(formIndex)}
                                    >
                                        Remove
                                    </Button>
                                )}
                                <FormStyled.FormContainer key={formIndex}>
                                    {form.map((field) => {

                                        const diplomaVerificationProps = field.name.includes('diplomaVerification')
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
                                                {...diplomaVerificationProps}
                                                validateFirst
                                            >

                                                {field.name.includes(`diplomaVerification`) &&
                                                    (<Dragger
                                                        name={field.name + "_" + formIndex}
                                                        fileList={fileList}
                                                        listType="picture"
                                                        showUploadList={true}
                                                        // onChange={onDiplomaFileChange}
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
                        <Button type="dashed" onClick={handleAddDiploma}>
                            Add another diploma
                        </Button>
                    </FormStyled.FormContainer>

                </FormStyled.FormWrapper>
            </Modal>
        </>
    );
};

export default EducationForm;