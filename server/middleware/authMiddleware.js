const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const {query} = require('../controllers/functions/queriesFunctions')

const protect = asyncHandler(async(req, res, next) => {
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // VERIFY TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from token
            const sql = `SELECT * FROM users WHERE id = '${decoded.id}' LIMIT 1;`
            const result = await query(sql);
            let newUser = {
                id: result[0].id,
                username: result[0].username,
                email: result[0].email,
                role: result[0].role
            };
            req.user = newUser;

            next();

         } catch(error){
             res.status(401)
             throw new Error('Not authorized')
         }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const protectExternal = asyncHandler(async(req, res, next) => {
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            if(token == 'iqh1G2wguvYA4UA3D4y0PnqPypFsdQoc')

            next();

         } catch(error){
             res.status(401)
             throw new Error('Not authorized')
         }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


module.exports = {protect,protectExternal}