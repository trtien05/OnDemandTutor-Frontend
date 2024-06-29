import React, { useState } from 'react'
import { Education } from '../../Tutor.type';
import { RcFile } from 'antd/lib/upload';
import { Flex, Image, Switch } from 'antd'
import { Clickable } from './TutorInfo.styled';
interface CertificateVerifyProps {
    certificate: Education;
    handleFunction: (id:number, checked: boolean) => void;
}

const CertificateVerify: React.FC<CertificateVerifyVerifyProps> = (props) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const item: Education = props.education;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [switchStates, setSwitchStates] = useState(false);

    const handlePreview = async (url: string) => {
        setPreviewImage(url);
        setPreviewOpen(true);
    };

    const handleChange = (id: number, checked: boolean) => {
        props.handleFunction(id, checked);
        setSwitchStates(checked);
    }
    const toggleSwitch = (id: number) => {
        handleChange(item.id, !switchStates);
    };



    return (
        <Clickable
        onClick={() => toggleSwitch(item.id)}
        style={{display:`flex`, justifyContent:`space-between`}}>
            <div style={{display: `flex`}}>
            <div style={{margin:`auto`, borderRadius:`20px`}}>
            <img src={item.diplomaUrl} 
            alt="diploma" 
            style={{margin:`auto`, borderRadius:`20px`}}
            width={`100`}
            onClick={(e) => handlePreview((e.target as HTMLImageElement).src)} />
            {previewImage && (
                <Image
                    wrapperStyle={{
                        height: "200%",
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                    style={{ display: 'none' }} // Ensure the image is not displayed
                />
            )}
            </div>
            <div style={{margin:`auto`, marginLeft:`20px`}}>
            <p>{item.universityName}</p>
            <p style={{fontWeight:`bold`}}>
                {`${item.degreeType.slice(0,1)}${item.degreeType.slice(1).toLowerCase()} `}
                of {item.majorName}</p>
            <p>Specialization: {item.specialization}</p>
            <p>{item.startYear} - {item.endYear}</p>
            </div>
            </div>
            <Switch
                checkedChildren="Accepted"
                unCheckedChildren="Rejected"
                checked={switchStates}
                style={{ margin: `auto` }}
                onChange={(checked) => handleChange(item.id, checked)}
            />
        </Clickable>
    )
}

export default CertificateVerify