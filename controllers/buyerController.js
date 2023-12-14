const Buyer = require('../models/buyer');
const Seller = require('../models/seller');
const Catalog = require('../models/catalog');

// get list of all sellers
module.exports.getSellerList = async (req, res) => {
    try {

        if (req.userType != 'buyer') {
            return res.status(400).json({
                message: 'Log in as buyer to see the sellers list!',
                status: 'fail'
            })
        }

        const sellers = await Seller.find({}).select('-password').select('-orders');

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

// get seller catalog
module.exports.getSellerById = async (req, res) => {
    try {

        const sellerId = req.params.seller_id;


        if (req.userType != 'buyer') {
            return res.status(400).json({
                message: 'Log in as buyer to see the seller catalog!',
                status: 'fail'
            })
        }

        let seller = await Seller.findOne({
            _id: sellerId
        });

        if (seller !== null) {
            seller.password = undefined;
            seller.email = undefined;
            seller.orders = undefined;

            const sellerCatalog = await Catalog.findOne({
                'sellerId': sellerId
            });
            
            let sellerData;

            if (sellerCatalog !== null) {
                // console.log(sellerCatalog);
                sellerData={seller, 'catalog':sellerCatalog.products}
            }

            console.log(sellerData);

            return res.status(200).json({
                'message': 'List of available sellers!',
                status: 'success',
                data: {
                    sellerData
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

// place an order
module.exports.placeOrder = async (req, res) => {
    try {
        const sellerId = req.params.seller_id;
        const orderProductsData = req.body.orderData;
        const seller = await Seller.findOne({
            _id: sellerId
        });

        if (seller !== null) {
            const catalog = await Catalog.findOne({
                'sellerId': sellerId
            });

            if (catalog !== null) {
                let orderData = {
                    'buyer': req.userId,
                    'products': orderProductsData
                }

                const result = await Seller.updateOne({
                    _id: sellerId
                }, {
                    $push: {
                        'orders': orderData
                    }
                });

                if (result.upsertedCount > 0 || result.modifiedCount > 0) {
                    return res.status(200).json({
                        message: 'Order placed successfully!',
                        status: 'success'
                    })
                }
            }
        } else {
            return res.status(400).json({
                message: 'This seller does not exist!',
                status: 'fail'
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to place order, server error!',
            status: 'fail',
            error: error.message
        })
    }
}