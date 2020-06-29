const jwt = require('jsonwebtoken');
require('dotenv').config;

// These functions are done synchronously as they aren't performed often or
// resource intensive
const generateToken = payload => {
    if(payload) {
        try {
            return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '120'});
        } catch (err) {
            console.log("Error: " + err.message);
        }
    } else {
        console.log("Token is undefined");
    }
    
    return undefined;
};

const verifyToken = token => {
    if(token) {
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET)
        } catch (err) {
            console.log("Error: " + err.message);
        }
    } else {
        console.log("Token is undefined");
    }
    
    return undefined;
};

module.exports = {
    generateToken: generateToken, 
    verifyToken: verifyToken
}