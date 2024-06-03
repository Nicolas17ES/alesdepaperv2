// generate a token
const jwt = require('jsonwebtoken');


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
// generated
module.exports = {generateToken};