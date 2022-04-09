const statuses = [
    {
        color: "#b4df51",
        dot: "green",
        description: "LOI has been acccepted. Looking for a suitable position.",
        name: "active",
    },
    {
        color: "#cccccc",
        dot: "grey",
        description: "Initial entry of candidate.",
        name: "initial",
    },
    {
        color: "#ffde5a",
        dot: "yellow",
        description: "Candidate has been interviewed by manager.",
        name: "interviewed",
    },
    {
        color: "#51b7df",
        dot: "blue",
        description: "Candidate has been submitted to a contract. ",
        name: "processing",
    },
    {
        color: "#fcc44f",
        dot: "orange",
        description: "LOI has been sent to candidate. Waiting for acceptance.",
        name: "recruiting",
    },
]
export default statuses
