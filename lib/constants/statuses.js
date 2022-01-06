const statuses = [
    {
        color: "grey",
        description: "Initial entry of candidate.",
        name: "initial",
    },
    {
        color: "yellow",
        description: "Candidate has been interviewed by manager.",
        name: "interviewed",
    },
    {
        color: "orange",
        description: "LOI has been sent to candidate. Waiting for acceptance.",
        name: "recruiting",
    },
    {
        color: "green",
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
