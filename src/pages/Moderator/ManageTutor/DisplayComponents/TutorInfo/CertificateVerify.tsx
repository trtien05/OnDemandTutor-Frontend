import React, { useState } from 'react'
import { Certificate } from '../../Tutor.type';
import { Switch } from 'antd'
import { Clickable } from './TutorInfo.styled';
import FileViewer from '../../../../../components/FileViewer/FileViewer';
interface CertificateVerifyProps {
    certificate: Certificate;
    handleFunction: (id: number, checked: boolean) => void;
}

const CertificateVerify: React.FC<CertificateVerifyProps> = (props) => {
    const item: Certificate = props.certificate;
    const [switchStates, setSwitchStates] = useState(false);

    const handleChange = (id: number, checked: boolean) => {
        props.handleFunction(id, checked);
        setSwitchStates(checked);
    }
    const toggleSwitch = (id: number) => {
        handleChange(id, !switchStates);
    };



    return (
        <Clickable
            onClick={() => toggleSwitch(item.id)}
            style={{ display: `flex`, justifyContent: `space-between` }}>
            <div style={{ display: `flex`, width: `70%`}}>
                <div style={{ margin: `auto`, width:`30%` }}>
                    <FileViewer alt='certificate'
                        fileUrl={item.certificateUrl}
                        width='100'
                        borderRadius='20px' />
                </div>
                <div style={{ margin: `left`, marginLeft: `20px`, width:`70%` }}>
                    <p style={{ fontWeight: `bold` }}>
                        {item.certificateName}</p>
                    <p>Issued: {item.issuedBy} - {item.issuedYear}</p>
                    <p>{item.description ? item.description : ''}</p>
                    <p>Relevant subject: {item.subject}</p>
                </div>
            </div>
            <Switch
                checkedChildren="Admit"
                unCheckedChildren="Deny"
                checked={switchStates}
                style={{ margin: `auto` }}
                onChange={(checked) => handleChange(item.id, checked)}
            />
        </Clickable>
    )
}

export default CertificateVerify