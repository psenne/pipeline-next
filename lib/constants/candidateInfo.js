const tmplCandidate = {
    current_contract: null,
    current_company: null,
    firstname: null,
    lastname: null,
    emailaddress: null,
    telephone: null,
    title: null,
    found_by: null,
    filenames: [],
    interview_date: null,
    interviewed_by: [],
    level: null,
    loi_sent_date: null,
    loi_sent_by: null,
    location: null,
    next_steps: null,
    notes: null,
    potential_contracts: [],
    prefered_location: null,
    skill: null,
    salary: null,
    archived: false,
    actioned_to: null,
    resume_text: null,
}

// prettier-ignore
const tmplLOIStatus = [
    { key: "notsent", text: "Not Sent", value: "notsent" },
    { key: "sent", text: "Sent", value: "sent" },
    { key: "accepted", text: "Accepted", value: "accepted" }
];

export { tmplCandidate, tmplLOIStatus }
