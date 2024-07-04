const express=require('express');
const router=express.Router();
const authcontroller=require('../controller/authcontroller');
router.get('/login',authcontroller.login_get);
router.post('/login',authcontroller.login_post);
router.get('/signup',authcontroller.signup_get);
router.post('/signup',authcontroller.signup_post);

module.exports=router;