const rejectForm = {
    INTRO: "We regret to inform you that your question submission has been rejected. Please recheck the content of your question and ensure it adheres to our guidelines. Once revised, you can resubmit your question for approval.",
    ENDING: "If you have any questions or need further assistance, please do not hesitate to contact us. Thank you for your understanding.",
}

const rejectReasons = [
    {
        key: "Unrelated File/Content",
        mail: "Your question appears to contain unrelated content. Please ensure that your attached file is relevant to the question and resubmit."
    },
    {
        key: "Inappropriate Language or Content",
        mail: "Your submission contains inappropriate language or content. Please rephrase your question respectfully or remove any inappropriate material and resubmit."
    },
    {
        key: "Sensitive Information",
        mail: "Your submission contains personal or sensitive information. Please remove any such data before resubmitting."
    }
]

const approveForm = {
    INTRO: "Your question has been successfully approved and uploaded to our platform. Please wait for our tutors to review and provide assistance.",
    ENDING: "We appreciate your contribution and hope you find the help you need.Thank you for using our service!"
}

export const questionApprovalMessages = `${approveForm.INTRO} <br/> <br/> ${approveForm.ENDING}`


export const questionRejectionMessages = [
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
    }
]
