const jwt = require("jsonwebtoken");
const User = require('../mongo/schemas/user');

exports.authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    let tokenData;
    try {
        tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return res.status(400).send("Invalid token");
    }

    const user = await User.findById(tokenData.id);
    if(user){
        req.sessionUser = user;
    }
    next();

};
