require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')

/**
 * Middlewares
 */
app.use(
    [
        require('./middlewares/token'),
        require('./middlewares/logged')
    ]
)
app.use(cors())
app.use(bodyParser.json())

// use routes
require('./resolvers')(app)

// The `listen` method launches a web server.
app.listen(4004, () => {
    console.log(`🚀  Server ready at localhost:4004`);
});