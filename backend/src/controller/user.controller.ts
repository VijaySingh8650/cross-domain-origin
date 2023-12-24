import  {User} from "../models/user.model";
import {Request, Response } from "express";
import jwt from "jsonwebtoken";

export const registerUer = async(req:Request, res: Response):Promise<void> =>{
     let {email, password} = req.body;

     if(!email || !password){
        res.status(404).send({message: "Please write email & password"});
        return;
    }

     try{
        let userDetails = await User.findOne({email});
     
        if(userDetails){
            res.status(401).send({message: "User has already registered"});
            return;
        }
        await User.create({email, password});
        res.status(200).send({message: "You are successfully registered", user : {email, password}});
        return;

     }
     catch(err: any){

        res.status(500).send({message:err.message});

     }
}


export const login = async(req:Request, res:Response):Promise<void> =>{
    let {email, password} = req.body;
    if(!email || !password)  {
        res.status(401).send({message:"Please enter email & password"});
    }
    try{

        let findEmail = await User.findOne({email, password});
        if(findEmail){

            const token = jwt.sign({email, password}, process.env.SECRET_KEY || "secret_key", { expiresIn: '1m' });
            const refreshToken = jwt.sign({email, password}, process.env.SECRET_KEY || "secret_key", { expiresIn: '2m' });

            res.status(200).send({token, refreshToken});
            return;

        }
        res.status(401).send({message: "Unauthorised"});
        return;

    }
    catch(err:any){
        res.status(500).send({message: err?.message});
    }

}


type requestToken  = string;
export const regenerateToken = (req:Request , res:Response):void =>{
    let refreshToken: any = req.header("Refreshtoken");
    try{

        let refreshTokenVerification : any = jwt.verify(refreshToken, process.env.SECRET_KEY || "secret_key");
        if(refreshTokenVerification?.email && refreshTokenVerification?.password){

            let token = jwt.sign({email : refreshTokenVerification?.email, password: refreshTokenVerification?.password}, process.env.SECRET_KEY || "secret_key", {expiresIn:"1m"});
            res.status(200).send({message:"Token is regenerated", token, refreshToken});

        }

        
        return;
    }
    catch(err:any){
        res.status(403).send({message: "Please login again"});
    }

}