import React, { useState } from 'react'
import { Education } from '../../Tutor.type';
import { Switch } from 'antd'
import { Clickable } from './TutorInfo.styled';
import FileViewer from '../../../../../components/FileViewer/FileViewer';
interface EducationVerifyProps {
    education: Education;
    handleFunction: (id:number, checked: boolean) => void;
}

const EducationVerify: React.FC<EducationVerifyProps> = (props) => {
    const item: Education = props.education;
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
        style={{display:`flex`, justifyContent:`space-between`}}>
            <div style={{display: `flex`, width:`70%`}}>
            <div style={{margin:`auto`, width:`30%`}}>
            <FileViewer alt='diploma' 
                fileUrl={item.diplomaUrl} 
                width='100' 
                borderRadius='20px' />
            </div>
            <div style={{margin:`auto`, marginLeft:`20px`, width:`70%`}}>
            <p>{item.universityName}</p>
            <p style={{fontWeight:`bold`}}>
                {`${item.degreeType.slice(0,1)}${item.degreeType.slice(1).toLowerCase()} `}
                of {item.majorName}</p>
            <p>Specialization: {item.specialization}</p>
            <p>{item.startYear} - {item.endYear}</p>
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

export default EducationVerify