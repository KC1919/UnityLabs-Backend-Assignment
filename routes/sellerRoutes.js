const express=require('express');
const router=express.Router();
const sellerController=require('../controllers/sellerController');
const verifyUser = require('../middlewares/verify');

router
    .post('/create-catalog', verifyUser, sellerController.createCatalog)

module.exports=router;