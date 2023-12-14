const express=require('express');
const router=express.Router();
const buyerController=require('../controllers/buyerController');
const verifyUser = require('../middlewares/verify');

router
    .get('/list-of-sellers', verifyUser, buyerController.getSellerList)
    .get('/seller-catalog/:seller_id', verifyUser, buyerController.getSellerById)
    .post('/create-order/:seller_id', verifyUser, buyerController.placeOrder)

module.exports=router;