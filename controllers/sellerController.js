const Seller = require('../models/seller');
const Buyer = require('../models/buyer');
const Catalog = require('../models/catalog');

module.exports.createCatalog = async (req, res) => {
    try {
        const products = req.body.products;
        // const sellerCatalog = await Catalog.findOne({ 'sellerId': req.userId });
        if (products !== null && products.length > 0) {
            const result = await Catalog.updateOne({ 'sellerId': req.userId }, {
                $push: { 'products': products }
            }, { upsert: true });

            if (result !== null) {
                const sellerCatalog = await Catalog.findOne({ 'sellerId': req.userId });
                return res.status(201).json({
                    message: 'Products added to Catalog!', status: 'success', data: {
                        sellerCatalog
                    }
                })
            }
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to create seller catalog, server error',
            status: 'fail',
            error: error.message
        })
    }
}