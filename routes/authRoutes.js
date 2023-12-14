const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');
const verify=require('../middlewares/verify');

router
    .post('/login', authController.login)
    .post('/register', authController.register)
    .get('/logout', verify, authController.logout)

module.exports=router;