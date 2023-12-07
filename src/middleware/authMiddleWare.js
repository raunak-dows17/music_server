const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded.userId,
            email: decoded.email
        })

        if (!user) {
            return res.status(404).json({
                message: "User not Found"
            });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Invalid Token"
        });
    }
}

module.exports = authMiddleWare;
