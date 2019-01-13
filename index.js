const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const signup = require('./api/signup/signup');
const login = require('./api/login/login');

//Adding this to not get DeprecationWarning: collection.ensureIndex is deprecated. 
mongoose.set('useCreateIndex', true);
app = express();


/**
 *  Throws error if jwtPrivateKey is not defined.
 */
if(!config.get('jwtPrivateKey')){
    console.error('ERROR: JSON Web Token not defined');
    process.exit(1);
}


/**
 *  Throws error if not connected to mongoDB
 */
mongoose.connect("mongodb://localhost:27017/giveaway", { useNewUrlParser: true })
    .then( () => console.log('Connected to givaway database'))
    .catch(err => console.log('Could not connect to database', err));


app.use(express.json());
app.use('/api/signup', signup);
app.use('/api/login', login);


app.get('/', (req, res) => {
    res.send('Nothing going on here, just landing page for index.js');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));