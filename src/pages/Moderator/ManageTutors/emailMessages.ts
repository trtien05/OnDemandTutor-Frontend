const rejectForm = {
    INTRO: "Thank you for your interest in joining our community of talented educators. We appreciate the time and effort you put into your application.",
    ENDING: "Although your application has not been approved at this time, we encourage you to review the feedback provided and re-apply in the future. We believe in your potential and look forward to seeing your improved application.",
}

const rejectReasons = [
    {
        key: "Incomplete fields or substandard materials.",
        mail: "Your application was rejected because some required fields were left incomplete or the provided materials did not meet our standards. Please ensure that all mandatory sections are filled out properly and all uploaded content is clear and professional."
    },
    {
        key: "Inappropriate or offensive content submitted.",
        mail: "Your application was rejected due to the presence of inappropriate or offensive content. Please ensure all submitted materials are respectful, truthful, and aligned with our community standards."
    },
    {
        key: "Insufficient or unverified credentials provided.",
        mail: "Your application was rejected because the provided credentials (diplomas or certificates) were insufficient or could not be verified. Please upload valid and verifiable documents that demonstrate your qualifications."
    },
    {
        key: "Teaching subject does not match qualifications.",
        mail: "Your application was rejected because the teaching subject you selected does not align with your qualifications. Please ensure your chosen subject matches your educational background and experience."
    }
]

export const approveForm = {
    INTRO: "Congratulations! Your tutor application has been approved, and we are excited to welcome you to our community of talented educators.",
    ENDING: "You can now access your profile and start connecting with students who are eager to learn from your expertise. We are confident that your skills and dedication will make a significant impact on our learners."
}

export const approveMessages = {
    REJECTED_DESCRIPTION: "However, we noticed that your introduction video or description did not meet our qualifications and has been removed from your profile. Please feel free to update these sections at your convenience to better showcase your skills and personality.",
    REJECTED_SUBJECT: "However, we noticed that your selected teaching subject did not match your qualifications and has been updated to better reflect your expertise. Please review the subjects listed on your profile to ensure accuracy.",
    REJECTED_DOCUMENT: "However, some of the diplomas or certificates you submitted were not approved due to insufficient information or verification. Please ensure all uploaded documents are clear, valid, and relevant to your qualifications.",
    REJECTED_FIELDS: "However, we noticed that your introduction video or description is either missing or did not meet our qualifications and has been removed from your profile. Additionally, some of the subjects you applied to teach were not approved due to insufficient credentials or experience. Please feel free to update your video or description and provide additional qualifications for the subjects as needed.",
    MISSING_DESCIPRITON: "However, we noticed that your introduction video or description was missing. Please update these sections to better present your qualifications and personality. A complete profile helps students understand your expertise and teaching style.",
    MISSING_SCHEDULE: "However, we noticed that you did not provide your teaching schedule. Please update your availability so that students can book sessions with you at convenient times. A complete schedule helps students plan their learning effectively.",
    MISSING_SCHEDULE_ADDITIONAL: "Also, as you did not provide your teaching schedule, please update it so that students can book sessions with you at convenient times."
}

export const tutorApprovalMessages = {
    fullyApproved: `${approveForm.INTRO} <br/> <br/> ${approveForm.ENDING}`,
    approveWithRejectedSubject: `${approveForm.INTRO} <br/> <br/> ${approveMessages.REJECTED_SUBJECT} <br/> <br/> ${approveForm.ENDING}`,
    approveWithRejectedDescription: `${approveForm.INTRO} <br/> <br/> ${approveMessages.REJECTED_DESCRIPTION} <br/> <br/> ${approveForm.ENDING}`,
    approveWithRejectedDocument: `${approveForm.INTRO} <br/> <br/> ${approveMessages.REJECTED_DOCUMENT} <br/> <br/> ${approveForm.ENDING}`,
    approveWithRejectedFields: `${approveForm.INTRO} <br/> <br/> ${approveMessages.REJECTED_FIELDS} <br/> <br/> ${approveForm.ENDING}`,
    approveWithMissingDescription: `${approveForm.INTRO} <br/> <br/> ${approveMessages.MISSING_DESCIPRITON} <br/> <br/> ${approveForm.ENDING}`,
    approveWithMissingSchedule: `${approveForm.INTRO} <br/> <br/> ${approveMessages.MISSING_SCHEDULE} <br/> <br/> ${approveForm.ENDING}`
}

export const tutorRejectionMessages = [
    {
        key: rejectReasons[0].key,
        message: `${rejectForm.INTRO} <br/> <br/> ${rejectReasons[0].mail} <br/> <br/> ${rejectForm.ENDING}`
    },
    {
        key: rejectReasons[1].key,
        message: `${rejectForm.INTRO} <br/> <br/> ${rejectReasons[1].mail} <br/> <br/> ${rejectForm.ENDING}`
    },
    {
        key: rejectReasons[2].key,
        message: `${rejectForm.INTRO} <br/> <br/> ${rejectReasons[2].mail} <br/> <br/> ${rejectForm.ENDING}`
    },
    {
        key: rejectReasons[3].key,
        message: `${rejectForm.INTRO} <br/> <br/> ${rejectReasons[3].mail} <br/> <br/> ${rejectForm.ENDING}`
    }
]
