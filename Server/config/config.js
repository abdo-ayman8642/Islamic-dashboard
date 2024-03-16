
module.exports = {
    externalRepos: {
        authentication: "http://localhost:4203",
        frontend: "https://tridmark.com",
        // frontend: "http://localhost:4200",
    },
    db: {
        uri: 'mongodb+srv://Badr1002:Bb123456@cluster0.abzxp.mongodb.net/tridmark?readPreference=primary', 
        // uri:"mongodb://localhost:27017/tridmark"
    },
    JWTKEY: "TRIDMARK_JWT",
    SESSION_SECRET: 'Bb123456+',
    transportFile: {
        path: 'logs',
        maxSize: '20m',
        maxFiles: '14d'
    },

}