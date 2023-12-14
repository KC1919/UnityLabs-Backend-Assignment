const mongoose=require('mongoose');

const catalogSchema=mongoose.Schema({
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    products:[{
        name: {
            type:String,
            required: [true, "Product name must be provided!"]
        },
        price: {
            type:String,
            required: [true, "Product price must be provided!"]
        },
    }]
});

const Catalog=mongoose.model('Catalog',catalogSchema);

module.exports=Catalog;