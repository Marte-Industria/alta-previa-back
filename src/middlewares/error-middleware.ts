// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from "express"

export default (fn : Function) =>{
    return (req : Request, res : Response, next : NextFunction)=>{
        try {
            fn(req,res,next)    
        } catch (error) {
            next()
        }
    }
}