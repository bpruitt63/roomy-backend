const db = require('../db');
const bcrypt = require('bcrypt');
const {BCRYPT_WORK_FACTOR} = require('../config');
const {BadRequestError} = require('../expressError');

class User {

    //Create new user
    static async create({email, pwd, firstName, lastName, superAdmin=false}) {

        //Check for duplicate email
        const isDupe = await db.query(
            `SELECT email
            FROM users
            WHERE email = $1`,
            [email]
        );

        if (isDupe.rows[0]) {
            throw new BadRequestError(`There is already an account
                                        associated with ${email}`);
        };

        const hashedPwd = await bcrypt.hash(pwd, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
                    (email,
                    pwd,
                    first_name,
                    last_name,
                    super_admin)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING email, first_name AS "firstName", 
                    last_name AS "lastName", super_admin AS "superAdmin"`,
            [email, hashedPwd, firstName, lastName, superAdmin]
        );

        const user = result.rows[0];
        return user;
    };


    //Validate user login and return user info
    static async login(email, pwd) {

        const result = await db.query(
            `SELECT email,
                    pwd,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    super_admin AS "superAdmin"
            FROM users WHERE users.email = $1`,
            [email]
        );

        let user = result.rows[0];
        
        if (user) {
            const isValid = await bcrypt.compare(pwd, user.pwd);
            if (isValid === true) {
                delete user.pwd;
                return user;
            };
        };

        throw new UnauthorizedError("Invalid email/password");
    };

};

module.exports = User;