const tmplCandidate = {
    current_contract: "",
    current_company: "",
    firstname: "",
    lastname: "",
    emailaddress: "",
    telephone: "",
    found_by: "",
    interview_date: null,
    interviewed_by: [],
    level: "",
    loi_sent_date: null,
    loi_sent_by: "",
    notes: "",
    potential_contracts: [],
    prefered_location: "",
    skill: "",
    salary: "",
    archived: false,
    resume_text: "",
}

// prettier-ignore
const tmplLOIStatus = [
    { key: "notsent", text: "Not Sent", value: "notsent" },
    { key: "sent", text: "Sent", value: "sent" },
    { key: "accepted", text: "Accepted", value: "accepted" }
];

export { tmplCandidate, tmplLOIStatus }
