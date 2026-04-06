//imported express
const express = require('express')
//imported jwt
const jwt = require('jsonwebtoken')
//imported body parser
const bodyparser = require('body-parser')
//imported uuid
const { v4: uuid } = require('uuid')

//create an app
const app = express()
//put middleware of body parser
app.use(bodyparser.json())

//token secrets
const ACCESS_TOKEN = "access-secret"
const REFRESH_TOKEN = "refresh-secret"

//in - memory db
let refreshTokenDB = []

//helper function to generate an token
function generateTokens() {
    //access token (short-lived)
    const accesstoken = jwt.sign({
        id: user.id, username: user.name
    }, ACCESS_TOKEN, { expiresIn: '15m' })

    //refresh token (long-lived)
    const refreshtoken = jwt.sign({ id: user.id, tokenId: uuidv4() 
    }, ACCESS_TOKEN, { expiresIn: '7d' })

    //pushed in memory db
    refreshTokenDB.push(refreshtoken)
    //return both the tokens
    return {accesstoken,refreshtoken}
}

//login route
app.post("/login",(req,res)=>{
    const { username, password } = req.body;

    // ⚠️ Normally validate from DB
    if (username !== 'admin' || password !== 'password') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = {id:1,username}
    //generate token
    const {accesstoken, refreshToken} = generateTokens(user)
    res.json({
        accesstoken,
        refreshToken
    });
})

//middleware authenticated user route
function authenticatedToken(req,res,next){
    //get authheader
    const authheader = req.headers['authorization']
    //expect bearer token
    const token = authheader && authheader.split(' ')[1]
    //check token
    if (!token) {
        return res.sendStatus(401); // No token
    }
    //verify the token
    jwt.verify(token,ACCESS_TOKEN,(err,user)=>{
        if (err) {
            // Token expired or invalid
            return res.sendStatus(403);
        }
        req.user = user; // attach user to request
        next();
    })
}

//protected route
app.get('/protected', authenticateToken, (req, res) => {
    //send response
    res.json({
        message: 'Protected data accessed',
        user: req.user
    });
});

//refresh token route
app.post('/refresh',(req,res)=>{
    const { refreshToken } = req.body;
    //check if token is present or not
    if (!refreshToken) {
        return res.sendStatus(401);
    }
    // Check if token exists in DB
    if (!refreshTokensDB.includes(refreshToken)) {
        return res.sendStatus(403);
    }
    //verify
    jwt.verify(refreshToken,REFRESH_TOKEN,(err,user)=>{
        //if error then return
        if(err){
            return res.sendStatus(403);
        }
        //issue new access token and refresh token
        const newAccessToken = jwt.sign(
            { id: user.id },
            ACCESS_TOKEN,
            { expiresIn: '15m' }
        )
        //response new access token
        res.json({ accessToken: newAccessToken });
    })
})

//logout 
app.post('/logout', (req, res) => {
    const { refreshToken } = req.body;
    // Remove refresh token from DB
    refreshTokensDB = refreshTokensDB.filter(
        token => token !== refreshToken
    );
    res.json({ message: 'Logged out successfully' });
});

//start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

