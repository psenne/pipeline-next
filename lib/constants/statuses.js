const statuses = [
    {
        color: "grey",
        description: "Initial entry of candidate.",
        name: "initial",
    },
    {
        color: "gold",
        description: "Candidate has been interviewed by manager.",
        name: "interviewed",
    },
    {
        color: "darkorange",
        description: "LOI has been sent to candidate. Waiting for acceptance.",
        name: "recruiting",
    },
    {
        color: "darkgreen",
        description: "LOI has been acccepted. Looking for a suitable position.",
        name: "active",
    },
    {
        color: "blue",
        description: "Candidate has been submitted to a contract. ",
        name: "processing",
    },
]
export default statuses
