const express = require('express');
const jsonschema = require('jsonschema');
const User = require('../models/user');
const loginSchema = require('../schemas/loginSchema.json');
const userNewSchema = require('../schemas/userNewSchema.json');
const {BadRequestError} = require('../expressError');
const {createToken} = require('../helpers');

const router = new express.Router();

/** Route to validate and log in a registered user, returns token */
router.post('/login', async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, loginSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        };

        const {email, pwd} = req.body;
        let user = await User.login(email, pwd);
        const token = createToken(user);

        return res.json({token});

    } catch(err) {
        return next(err);
    };
});

/** For new user registration, returns token */
router.post('/register', async function(req, res, next){
    try{
        const validator = jsonschema.validate(req.body, userNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        };

        const {email, pwd, firstName, lastName} = req.body;
        const superAdmin = false;
        let user = await User.create({email, pwd, firstName, lastName, superAdmin});

        const token = createToken(user);

        return res.json({token});
    } catch(err) {
        return next(err);
    };
});

module.exports = router;