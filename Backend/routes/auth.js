const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "mynameisshyamsutariamdoingcomputerengineering";
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

//Route1: Create a User using: POST "/api/auth/createuser" No login required
router.post('/createuser', [
  body('email', 'Enter a Valid email').isEmail(),
  body('name', 'Enter a Valid name').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
] , async(req,res)=>{

  //if there are errors, return bad request and the error
  
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

//check whether the user with this email exists already

try {
  let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "Sorry a user with this email already exists"})
    } 

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);



    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken})

    res.json(user)
    
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error: err.message})})

} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error")
}
    
})


//Route 2: Authenticate a user 

router.post('/loginuser', [
  body('email', 'Enter a Valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
  ] , async(req,res)=>{


  //if there are errors, return bad request and the error
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const{email, password} = req.body;

  try {
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error : "Wrong Credentials"});
    }

    const passCompare = await bcrypt.compare(password, user.password);

    if(!passCompare){
      return res.status(400).json({error : "Wrong Credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }

})

//Route 3:  get loggedin users details.


router.post('/sample' , fetchUser,async(req,res)=>{


try {
  userId = req.user.id
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured")
}
  })

module.exports = router;