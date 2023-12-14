const Buyer = require('../models/buyer');
const Seller = require('../models/seller');
const Catalog=require('../models/catalog');

module.exports.getSellerList = async (req, res) => {
    try {

        if (req.userType != 'buyer') {
            return res.status(400).json({
                message: 'Log in as buyer to see the sellers list!',
                status: 'fail'
            })
        }

        const sellers = await Seller.find({});

        if (sellers !== null && sellers.length > 0) {
            return res.status(200).json({
                'message': 'List of available sellers!',
                status: 'success',
                data: {
                    sellers
                }
            })
        } else {
            return res.status(400).json({
                'message': 'No sellers found!',
                status: 'fail',
                data: []
            })
        }

    } catch (error) {
        return res.status(500).json({
            'message': 'Failed to find sellers, server error!',
            status: 'fail',
            error: error.message
        })
    }
}

module.exports.getSellerById = async (req, res) => {
    try {

        const sellerId=req.params.seller_id;


        if (req.userType != 'buyer') {
            return res.status(400).json({
                message: 'Log in as buyer to see the seller catalog!',
                status: 'fail'
            })
        }

        const seller = await Seller.findOne({_id: sellerId});

        if (seller !== null) {
            seller.password=undefined;
            seller.email=undefined;
            seller.orders=undefined;

            const sellerCatalog=await Catalog.findOne({'sellerId':sellerId});
            
            if(sellerCatalog!==null){
                console.log(sellerCatalog);
                seller.catalog=sellerCatalog;
            }

            return res.status(200).json({
                'message': 'List of available sellers!',
                status: 'success',
                data: {
                    seller
                }
            })
        } else {
            return res.status(400).json({
                'message': 'No seller found!',
                status: 'fail',
                data: []
            })
        }

    } catch (error) {
        return res.status(500).json({
            'message': 'Failed to find seller, server error!',
            status: 'fail',
            error: error.message
        })
    }
}