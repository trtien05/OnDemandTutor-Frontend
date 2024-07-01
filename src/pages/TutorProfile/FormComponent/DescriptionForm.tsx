import React, { useEffect, useState } from 'react';
import * as FormStyled from '../../BecomeTutor/Form.styled'
import ReactPlayer from 'react-player';
import { Button, Form, Input, notification } from 'antd';
import { Details } from '../TutorProfile.type';
import { updateTutorDescription } from '../../../utils/tutorAPI';


interface DescriptionFormProps {
    tutorDetails: Details;
    tutorId: number;
    isUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const DescriptionForm: React.FC<DescriptionFormProps> = (props) => {
    const [tutorDetails, setTutorDetails] = useState<any>(props.tutorDetails);
    const tutorId = props.tutorId;
    const [url, setUrl] = useState<string>("");
    const [priceValue, setPriceValue] = useState<string>("");
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    useEffect(() => {
        form.setFieldsValue({
            teachingPricePerHour: tutorDetails.teachingPricePerHour,
            backgroundDescription: tutorDetails.backgroundDescription,
            meetingLink: tutorDetails.meetingLink,
            videoIntroductionLink: tutorDetails.videoIntroductionLink,
            subjects: tutorDetails.subjects,
        });
    }, [tutorDetails]);

    const isValidYouTubeUrl = (url: string): boolean => {
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        return regex.test(url);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        if (isValidYouTubeUrl(url)) {
            setUrl(url);
        } else {
            setUrl("");
        }
    };

    const onChange = (value: number | string | null) => {
        if (typeof value === "string") {
            setPriceValue(value);
        } else if (value === null) {
            setPriceValue("");
        } else {
            setPriceValue(value.toString());
        }
    };

    const formatNumberValue = (value: number | string): number => {
        if (typeof value === "string") {
            // Remove non-digit characters from the string
            const numericString = value.replace(/\D/g, "");
            // Convert the cleaned string to a number
            return parseFloat(numericString);
        } else {
            // If the value is already a number, return it directly
            return value;
        }
    };
    const formatter = (value: number | string | undefined) => {
        if (!value) return "";
        // Use the helper function to ensure value is a number
        const numberValue = formatNumberValue(value);
        // Use Intl.NumberFormat for Vietnamese locale
        return numberValue.toLocaleString();
    };
    const parser = (value: string | undefined) => {
        // Remove non-digit characters (commas, spaces, etc.)
        return value ? value.replace(/\D/g, "") : "";
    };
    //--------------------Finish Form--------------------
    const onFinish = async (values: any) => {
        try {
            await saveTutorDescription(tutorId, values);
            props.isUpdate(true);
            api.success({
                message: "Your profile has been updated successfully",
            });
        } catch (error: any) {
            api.error({
                message: "Error",
                description: error.response ? error.response.data : error.message,
            });
        }
    }

    //--------------------API Save Profile--------------------
    async function saveTutorDescription(tutorId: number, formData: any) {

        // Get JSON body from form data
        const jsonRequestBody = convertTutorDescriptionFormData(formData);

        try {

            // if (!user?.userId) return; // sau nay set up jwt xong xuoi thi xet sau
            const responseData = await updateTutorDescription(tutorId, jsonRequestBody);

            // Check response status
            if (!api.success) {
                throw new Error(`Error: ${responseData.statusText}`);
            }

            // Get response data
            console.log('Tutor description saved successfully:', responseData);

            // Return success response
            return responseData;
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
        }
    }

    function convertTutorDescriptionFormData(formData: any) {
        const descriptionData = {
            // convert form data to tutor description json format
            teachingPricePerHour: formData.teachingPricePerHour,
            backgroundDescription: formData.backgroundDescription,
            meetingLink: formData.meetingLink,
            videoIntroductionLink: formData.videoIntroductionLink,
            subjects: formData.subjects,
        };

        return descriptionData;
    }

    return (
        <>
            {contextHolder}
            <FormStyled.FormWrapper
                onFinish={onFinish}
                form={form}
                labelAlign="left"
                layout="vertical"
                requiredMark={false}
                size="middle"
                style={{ rowGap: "0px" }}
            >

                <FormStyled.FormItem
                    $width={"100%"}
                    name="teachingPricePerHour"
                    label="Hourly base rate (VND)"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            max: 1000000
                        },
                    ]}>
                    <FormStyled.NumberInput
                        style={{ width: '100%' }}
                        formatter={formatter}
                        parser={parser}
                        onChange={onChange}
                    >
                    </FormStyled.NumberInput>
                </FormStyled.FormItem>
                <FormStyled.FormDescription>
                    We will charge a 15% commission fee on each lesson. This fee is for the maintenance of the platform and marketing purposes.
                    The remaining will be transferred automatically to your bank account every 28 days.
                </FormStyled.FormDescription>

                <FormStyled.FormItem
                    name="backgroundDescription"
                    $width={"100%"}
                    label="Profile description"
                    rules={[{
                        required: true,
                        max: 255,
                        message: "Profile description cannot exceed 255 characters.",
                    }]}>
                    <FormStyled.CommentInput rows={4}
                        placeholder="Tell us about yourself..."
                        style={{ height: 120, resize: 'none', marginRight: '10px' }} />
                </FormStyled.FormItem>



                <FormStyled.FormItem
                    name="meetingLink"
                    label="Google Meet Link"
                    $width={"100%"}
                    rules={[
                        {
                            pattern:
                                /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}(?:\?pli=1)?$/,
                            message: "Invalid Google Meet link.",
                        },
                        {
                            required: true,
                            message: "Please provide your Google Meet link.",
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Paste your Google Meet link"
                    ></Input>
                </FormStyled.FormItem>

                <FormStyled.FormItem
                    name="videoIntroductionLink"
                    label="Video introduction"
                    $width={"100%"}
                    rules={[
                        {
                            pattern:
                                /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
                            message: "Invalid Youtube link.",
                        },
                    ]}
                >
                    <Input
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Paste a Youtube link to your video"
                    ></Input>
                </FormStyled.FormItem>
                {tutorDetails.videoIntroductionLink && (
                    <div style={{ width: "100%", height: "100%", marginBottom: `20px`, marginTop:`10px` }}>
                        <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
                            <ReactPlayer
                                className="react-player"
                                url={tutorDetails.videoIntroductionLink}
                                controls={true}
                                width="100%"
                                height="100%"
                                style={{ position: 'absolute', top: 0, left: 0 }}
                            />
                        </div>
                    </div>
                )}
                <FormStyled.FormItem
                    name="subjects" hidden>
                </FormStyled.FormItem>

                <FormStyled.ButtonDiv style={{ justifyContent: `flex-end` }}>
                    <Button type="default" htmlType="submit"
                        style={{ borderRadius: `6px`, fontWeight: `bold`, width: `150px` }}>
                        Save profile
                    </Button>
                </FormStyled.ButtonDiv>
            </FormStyled.FormWrapper></>
    )
}

export default DescriptionForm