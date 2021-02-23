require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const models = require('./sequelize/models');

/**
 * Middlewares
 */
app.use(
    [
        require('./middlewares/token'),
        require('./middlewares/logged')
    ]
)
app.use(bodyParser.json())



// The `listen` method launches a web server.
app.listen(4004, () => {
    console.log(`🚀  Server ready at localhost:4004`);
});