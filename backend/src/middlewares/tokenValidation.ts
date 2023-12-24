import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

type requestToken  = string;
export const validationOftoken = (req:Request & {token?:requestToken}, res:Response, next:NextFunction):void =>{

    let token:any = req.header("Authorization");

    try{
       const decode = jwt.verify(token, process.env.SECRET_KEY || "secret_key");
       if(decode){
           
           res.status(200).send({message:"Token is valid"});
           
       }
       return;
    }

    catch(err:any){
     
        if(err?.name === "TokenExpiredError"){
            next();
            return;
        }
        res.status(401).send({ error: 'InvalidTokenError', decoded: null });
        return;

    }

}