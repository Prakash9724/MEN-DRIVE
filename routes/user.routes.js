const express = require('express')
const router = express.Router();
const { body,validationResult } = require('express-validator');

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register'
    ,
    body('email').trim().isEmail().isLength({min:13}),
    body("username").trim().isLength({min:5}),
    body("password").trim().isLength({min:3})
    
    ,(req,res)=>{
    // [username,email,password]=req.body;
        const err = validationResult(req);
    console.log(req.body)
    if(!err.isEmpty()){
        return res.status(400).json({err:err.array(),message:'Invalid Data'})
    }
    res.send(err)
})

module.exports = router;