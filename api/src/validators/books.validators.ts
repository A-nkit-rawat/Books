import { bookSchema } from "../schemas/schema";
import { Book } from "../types/common";

export const validateBook=(book:Book):{success:boolean,result:{}}=>{
    const result=bookSchema.safeParse(book);
    if(result.success){
        return {success:true,result:result.data}
    }
    else{
        return {success:false,result:result.error.issues};
    }
}
