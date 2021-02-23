const auth = require('./auth')
const plans = require('./plans')

module.exports = [
    ...auth,
    ...plans
]