const jwt = require('jsonwebtoken');
const JWT_SECRET = "mynameisshyamsutariamdoingcomputerengineering";


const fetchUser = (req,res, next) => {

    //get the user from the jwt token and add id to req obj

    const token = req.header('auth-token');
    if(!token){
        req.status(401).send({error: "please auth using a valid token"});
    }

    try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next()
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }

}

module.exports = fetchUser;