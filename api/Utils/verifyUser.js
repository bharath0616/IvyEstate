import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken";


export const verifyUser=(req,res,next)=>{
    const Jwt = jwt;
    const token=req.cookies.access_token

    if(!token) return next(errorHandler(401,'Unauthorized'));

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(402,'Forbidden'));

        req.user=user;
        next();
    })
}