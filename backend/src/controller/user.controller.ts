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
            res.status(200).send({message: "You are already registered"});
            return;
        }
        await User.create({email, password});
        res.status(200).send({message: "You are successfully registered"});
        return;

     }
     catch(err: any){

        res.status(500).send({message:err.message});

     }
}


export const login = async(req:Request, res:Response):Promise<void> =>{
    let {email, password} = req.body;
    if(!email || !password)  {
        res.status(200).send({message:"Please enter email & password"});
    }
    try{

        let findEmail = await User.findOne({email, password});
        if(findEmail){

            const token = jwt.sign({email, password}, process.env.SECRET_KEY ?? "secret_key", { expiresIn: '1m' });
            const refreshToken = jwt.sign({email, password}, process.env.SECRET_KEY ?? "secret_key", { expiresIn: '4m' });

            res.status(200).send({message: "You are logged-in", token, refreshToken});
            return;

        }
        res.status(200).send({message: "Unauthorised"});
        return;

    }
    catch(err:any){
        res.status(500).send({message: err?.message});
    }

}




type objType = {
    message: string;
    token: string;
    refreshToken:  string;
    regenerate? : boolean;
}
export const authorizedRoute = (req:Request, res:Response) => {
    let token = (req as any).token;
    let refreshToken = (req as any).refreshToken;

    let obj: objType = {
        message: "You are an authorized user", token, refreshToken
    }
    if((req as any)?.regenerate){
        obj = {
            ...obj,
            regenerate : true,
        }
    }
    res.status(200).send(obj);

}