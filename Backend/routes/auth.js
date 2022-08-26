const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using: POST "/api/auth/createuser" No login required
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

    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })

    res.json(user)
    
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({error: err.message})})

} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured")
}
    
})

module.exports = router;