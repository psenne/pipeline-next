const tmplCandidate = {
    current_contract: "",
    current_company: "",
    firstname: "",
    lastname: "",
    emailaddress: "",
    telephone: "",
    title: "",
    found_by: "",
    filenames: [],
    interview_date: "",
    interviewed_by: [],
    level: "",
    loi_sent_date: "",
    loi_sent_by: "",
    location: "",
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
