const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

const protect = expressAsyncHandler(async(req,res,next) =>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try {
            
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token , process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select("-password");

            if(!user)
            {
                res.status(401)
                throw new Error("Unauthourized Access!");
            }

            next();

        } catch (error) {
            console.log(error.message);
            res.status(400)
            throw new Error("Unauthourized Access!");
        }
    }
    else{
        res.status(400)
        throw new Error("Unauthourized Access!");
    }

    if(!token)
    {
        res.status(401)
        throw new Error("Not Authorized!");
    }
});

module.exports = protect;