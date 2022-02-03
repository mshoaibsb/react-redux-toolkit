const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.auth = async (req, res, next) => {
    try {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) throw Error("Not authorized to access this route");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) throw Error("No user found with this id");

        req.user = user;

        next();

    } catch (error) {
        return res.status(error.status || 401).json({
            message: error.message ? error.message : 'Something Went Wrong'
        })
    }
}