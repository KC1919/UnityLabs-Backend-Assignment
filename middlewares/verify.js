const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies['secret'];
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.username = payload.username;
        req.userType=payload.userType;
        next();
    } catch (error) {

        console.log('Unauthorized request, server error');
        return res.status(500).json({
            'message': 'Unauthorized request, server error',
            success: false,
            error: error.message
        });
    }
}


module.exports = verifyUser;