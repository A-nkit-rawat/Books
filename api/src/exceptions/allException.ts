import { Request,Response,NextFunction } from "express";
import { BookNotFoundError } from "./AppError";

export const allExceptionHandler=async(err:Error,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof BookNotFoundError){
        res.json({statusCode:err.statusCode,message:err.message})
    }
    else{
        res.json({statusCode:500,message:err.message||"Internal Server Error"})
    }
}