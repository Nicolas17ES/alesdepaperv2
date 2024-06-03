const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const {generateToken} = require('./functions/generateToken');
const {query} = require('./functions/queriesFunctions');

// @desc POST Register new user to:
// @route /video/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;

    if( !email || !username || !password || !role ){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // if data is there find if user already exists 
    const sql = `SELECT * FROM users WHERE email = '${email}' LIMIT 1;`
    let userExists = false;
    const result = await query(sql);

    if (result.length > 0){
        userExists = true;
    }   

    if (userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // if user does not exist HASH PASSWORD //
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user

    const sql2 = `INSERT INTO users (email, username, password, role) VALUES ('${email}', '${username}', '${hashedPassword}', '${role}');`;
    const result2 = await query(sql2);
    res.status(200).json({
        _id: result2.insertId,
        email: email,
        username: username,
        role: role,
        token: generateToken(result2.insertId),
    });
});


// @desc POST Login new user to:
// @route /video/users/login
// @access Public


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password ){
        res.status(400)
        throw new Error('Please include all fields')
    }

    // if data is there find if user already exists 
    const sql = `SELECT * FROM users WHERE email = '${email}' LIMIT 1;`
    let userExists = false;
    const result = await query(sql);
    if (result.length > 0){
        userExists = true;
    }   

    if(userExists && await bcrypt.compare(password, result[0].password)){
        res.status(200).json({
            _id: result[0].id,
            email: result[0].email,
            username: result[0].username,
            token: generateToken(result[0].id),
            isSuperAdmin: result[0].super_admin,
            role: result[0].role,
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
});




// @desc Get current user
// @route /discogs/users/me
// @access Private
const getMe  = asyncHandler(async(req, res) => {
    const user = {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role, 
    }

    res.status(200).json(user)
})


module.exports = {
    registerUser,
    loginUser,
    getMe,
}