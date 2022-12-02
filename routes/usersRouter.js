const express = require('express')
const router = express.Router()
const {userRegister,login}=require('../controllers/use.js')
//routes
router.get("/",(req,res)=>{
    res.render("user")
})
router.get("/register",(req,res)=>{
    res.render("register")
})
router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/welcome",(req,res)=>{
    // let email = req.params.id
    res.render("welcome")
})

router.post('/postRegistrationData',userRegister)
router.post('/postLoginData',login)

module.exports = router;