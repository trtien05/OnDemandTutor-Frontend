const rejectForm = {
    INTRO: "After careful review, we could not approve the documents you submitted. <br/> <br/> For your documents to be approved, please ensure they meet the following requirements:",
    ENDING: "The rejected documents have been deleted from our system. You can review the feedback provided, make the necessary updates, and resubmit your documents for review. If you have any questions or need assistance, feel free to reach out to us.",
}

const rejectReasons = [
    {
        key: "Unclear or illegible documents.",
        mail: "- They must be clear and high-quality, without any blurriness"
    },
    {
        key: "Invalid, expired, or unverified documents.",
        mail: "- They must be valid, current, and from a verifiable institution"
    },
    {
        key: "Incomplete or mismatched documents.",
        mail: "- They must be complete and consistent with the information provided in your application."
    },
    {
        key: "Non-English and non-Vietnamese documents without translation.",
        mail: "- If they are not in English or Vietnamese, please include certified translations."
    }
]

const approveForm = {
    INTRO: "After careful review, the documents you submitted have been approved.",
    ADDITIONAL: "However, some documents are rejected as they do not meet the following requirements:",
    ENDING: "Thank you for providing the necessary documentation. You can now view the verified documents in your Tutoring Info."
}

const requirements = `
    ${rejectReasons.map(reason => `${reason.mail}<br/>`).join(` `)}
`

export const rejectMessages = `${rejectForm.INTRO} <br/>${requirements} <br/>${rejectForm.ENDING}`

export const approveMessages = {
    fullyApproved: `${approveForm.INTRO} <br/><br/>${approveForm.ENDING}`,
    partiallyApproved: `${approveForm.INTRO} <br/><br/>${approveForm.ADDITIONAL} <br/>${requirements} <br/>${approveForm.ENDING}`
}

