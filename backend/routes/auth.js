const express = require("express")
const router = express.Router()
const User = require('../models/User')
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "inotebooks with react"

router.post("/createUser", [
    body('email', "email not valid").isEmail(),
    body('name', "name must be atleast 3 characters").isLength({ min: 3 }),
    body('password', "password must be atleast 5 characters").isLength({ min: 5 })
],
    async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        try {
            let emailValid = await User.findOne({ email: req.body.email })
            if (emailValid) {
                return res.status(400).send({success, message: "email is already exist" })
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            const data = {
                user: {
                    id: user._id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.status(201).send({success:true, message: "user registerd successfully", token: authtoken})

        } catch (err) {
            res.status(500).send({success:false,error:"Internal Server Error"})
        }
    })

// Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
   let success = false
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // const { email, password } = req.body;
    let userEmail = req.body.email
    let userPassword = req.body.password
    try {
        
        let user = await User.findOne({email:userEmail});
       
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare =await bcrypt.compare(userPassword, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user._id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, message: "login successfull", token: authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      let userId = req.user.id;
      const user = await User.findById(userId)
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
module.exports = router