import z, { success } from "zod";
import { idSchema } from "../schemas/schema";
export const validateId=(id:string)=>{
    const result=idSchema.safeParse(id);
    if(result.success){
        return {success:true,result:result.data as number};
    }
    else{
        return {success:false,message:JSON.stringify(result.error)}
    }


}