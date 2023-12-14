const express=require('express');
const router=express.Router();
const buyerController=require('../controllers/buyerController');
const verify=require('../middlewares/verify');

router
    .get('/list-of-sellers', verify, buyerController.getSellerList)
    .get('/seller-catalog/:seller_id', verify, buyerController.getSellerById)

module.exports=router;