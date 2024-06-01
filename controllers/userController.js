const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// REGISTER USER

const registerUser = expressAsyncHandler(async (req,res) =>{

    const {name , email , password} = req.body;

    if(!name || !email || !password)
    {
        res.status(401);
        throw new Eroor("Please Fill All Details !");
    }

    const userExits = await User.findOne({email : email});

    if(userExits)
    {
        res.status(400);
        throw new Error("User already exists!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);

    const user = await User.create({
        name,
        email,
        password : hashedPassword,
    })

    if(!user)
    {
        res.status(400);
        throw new Error("User Cannot Registered !");
    }

    res.status(201).json({
        id : user._id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id)
    })


})

// LOGIN USER

const loginUser = expressAsyncHandler(async (req,res) =>{

    const {email , password } = req.body;

    if(!email || !password){
        res.status(401);
        throw new Error("Please Fill All Details !");
    }

    const userExits = await User.findOne({email : email});
    
    if(userExits && (await bcrypt.compare(password, userExits.password)))
    {
        res.status(201).json({
            id : userExits._id,
            name : userExits.name,
            email : userExits.email,
            token : generateToken(userExits._id),
        })
    }
    else{
        res.status(404);
        throw new Error("Invalid Credential!")
    }

})

const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn : "30d",
    })
}

module.exports = {registerUser,loginUser};