require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;

const getDatabaseUri = () => {
    return (process.env.NODE_ENV === "test")
        ? "roomy_test"
        : process.env.DATABASE_URL || "roomy";
};

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {  
                    PORT,
                    SECRET_KEY,
                    BCRYPT_WORK_FACTOR,
                    getDatabaseUri
                };