const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User, validate} = require('../../models/objects/users/user');



/**
 *  Creates a user a stores it in database. 
        First validates input using validate function
        Then checks if phonenumber is in use
        If not, then we create a user object and save it to the database
 */
router.post('/', async(req, res) => {
    var validateInput = validate(req.body);

    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);
    
    let user = await User.findOne({phone: req.body.phone});
    if(user) return res.status(400).send('User is already registered');

    user = new User(_.pick(req.body, ['name', 'phone', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save();
    res.send(_.pick(user, ['_id', 'email']));
});


module.exports = router;