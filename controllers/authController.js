const bcrypt = require('bcrypt');
const Buyer = require('../models/buyer');
const Seller = require('../models/seller');
const jwt = require('jsonwebtoken');


module.exports.register = async (req, res) => {
    try {
        const {
            name,
            username,
            password,
            userType
        } = req.body;

        //encrypting user password
        const hashPass = await bcrypt.hash(password, 5);

        //making user details object
        const userData = {
            name: name,
            email: username,
            password: hashPass,
            userType: userType
        }

        let newUser;
        let userPresent = false;

        if (userType.toLowerCase() === 'buyer') {
            const user = await Buyer.findOne({
                email: username
            });
            if (user !== null) userPresent = true;
            else {
                newUser = await Buyer.create(userData);
            }
        } else if (userType.toLowerCase() === 'seller') {
            const user = await Seller.findOne({
                email: username
            });
            if (user !== null) userPresent = true;
            else {
                newUser = await Seller.create(userData);
            }
        } else {
            return res.status(400).json({
                message: "Ivalid user type!",
                status: 'fail'
            })
        }

        if (userPresent === true) {
            return res.status(400).json({
                'message': "User already exists!",
                status: 'fail'
            })
        }

        if (newUser !== null) {
            newUser.password = undefined;
            return res.status(200).json({
                message: 'User created successfully',
                success: true,
                data: {
                    newUser
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to create user',
            success: false,
            error: error.message
        })
    }
}

module.exports.login = async (req, res) => {
    try {
        const {
            username,
            password,
            userType
        } = req.body;

        let user;

        if (userType.toLowerCase() === 'buyer') {
            user = await Buyer.findOne({
                email: username
            });
        } else if (userType.toLowerCase() === 'seller') {
            user = await Seller.findOne({
                email: username
            });
        } else {
            return res.status(400).json({
                message: "Ivalid user type!",
                status: 'fail'
            })
        }

        if (user !== null) {
            const passMatchRes = await bcrypt.compare(password, user.password);

            if (passMatchRes === true) {

                //generating jwt access token
                const token = jwt.sign({
                    username: user.email,
                    userType: user.userType,
                    userId: user._id
                }, process.env.JWT_SECRET_KEY)

                //storing the token in cookie and sending it to the user
                res.cookie('secret', token, {
                    maxAge: 86400000,
                    httpOnly: false
                })

                user.password = undefined;

                return res.status(200).json({
                    message: 'User logged in successfully',
                    success: true,
                    token: token,
                    data: {
                        user
                    }
                });

            } else {
                return res.status(401).json({
                    message: 'Invalid username or password!',
                    success: false
                });
            }
        } else {
            return res.status(400).json({
                message: 'User not found!',
                success: false
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to login user, server error',
            success: false,
            error: error.message
        });
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.cookie('secret', "", {
            maxAge: Date.now()
        });

        return res.status(200).json({
            "message": "User logged out successfully!",
            success: true
        })

    } catch (error) {
        console.log("failed to logout user", error);
        return res.status(500).json({
            "message": "Failed to logout user",
            success: false,
            error: error.message
        })
    }
}