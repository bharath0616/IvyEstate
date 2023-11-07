import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { errorHandler } from '../Utils/error.js';
import jwt from 'jsonwebtoken'

export const singup=async(req,res,next)=>{
    try{
    const {username,email,password}=req.body;
    const hashPassword = bcryptjs.hashSync(password,12);
    const newUser=new User({username,email,password:hashPassword})
    
        await newUser.save()
        res.status(201).json("User created successfully !");
    }
    catch(error){
        console.log(error);
        next(error);
    }
};

export const signin = async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser= await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found!'));
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(404,'Incorrect password!'));
        const token = jwt.sign({ id: validUser._id },process.env.JWT_SECRET)
        const {password:hashedPassword, ...rest}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
    }
