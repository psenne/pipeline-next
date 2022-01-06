module.exports = {
    images: {
        domains: ["i.pravatar.cc"],
    },
    async redirects() {
        return [
            {
                source: "/redirect",
                destination: "/candidates",
                permanent: false,
            },
        ]
    },
}
