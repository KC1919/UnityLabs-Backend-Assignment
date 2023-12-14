const mongoose=require('mongoose');

const sellerSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name must be provided!']
    },
    email:{
        type:String,
        required:[true, 'Email must be provided!'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password must be provided!'],
        minLength: 8
    },
    orders:[{
        
    }],
    userType:{
        type:String,
        required:true
    }
});

const Seller=mongoose.model('Seller',sellerSchema);

module.exports=Seller;