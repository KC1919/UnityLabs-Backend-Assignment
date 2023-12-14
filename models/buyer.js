const mongoose = require('mongoose');

const buyerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided!'],
        unique:true
    },
    email: {
        type: String,
        required: [true, 'Email must be provided!']
    },
    password: {
        type: String,
        required: [true, 'Password must be provided!'],
        minLength: 8
    },
    orderHistory: [{
        date: {
            type: Date,
            default: Date.now
        },
        items: [{
            name: String
        }]
    }]
});

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;