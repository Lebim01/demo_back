const auth = require('./auth')
const plans = require('./plans')

module.exports = (app) => {
    app.use('/auth', auth)
    app.use('/plans', plans)
}