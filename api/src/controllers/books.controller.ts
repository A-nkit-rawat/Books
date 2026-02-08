import { Request, Response } from "express";
import { Book, GetBooksQueryParams } from "../types/common";
import { validateAndModifyGetBookQueryParams } from "../validators/queryParams.validators";
import { deleteBook, getBook, getBooks, saveBook, updateBook } from "../services/books.service"
import { validateBook } from "../validators/books.validators";
import { BookNotFoundError, ValidationError } from "../exceptions/AppError";
import { validateId } from "../validators/id.validation";
interface Id {
    id: string
}
export const getBooksController = async (req: Request<{}, {}, {}, GetBooksQueryParams>, res: Response): Promise<any> => {
    const queryParams: GetBooksQueryParams = req.query;
    // console.log(queryParams)
    const { limit, page } = validateAndModifyGetBookQueryParams(queryParams);
    const result = await getBooks({ limit, page })
    res.status(200).json(result);
}
export const getBookController = async (req: Request<{ id: string }>, res: Response) => {
    const isId = validateId(req.params.id);
    if (isId.success) {
        if (isId.result != undefined) {
            const result = await getBook(isId.result);
            res.json({ statusCode: 200, data: result });
        }
        else {
            throw new ValidationError("Id can't be undefine", 400);
        }

    }
    else if (!isId.success) {
        throw new ValidationError(isId.message || "Id is not Correct", 400)
    }
}
export const createBookController = async (req: Request<{}, Book>, res: Response) => {
    const book: Book = req.body;
    const isValid = validateBook(book);
    if (isValid.success) {
        const result = await saveBook(book);
        res.json({ statusCode: 201, data: result.data })
    }
    else {
        throw new ValidationError(isValid.result.toString(), 400)
    }

}
export const updateBooks = async (req: Request<{ id: string }, Book>, res: Response) => {
    const book: Book = req.body;
    const isIdValid = validateId(req.params.id);
    const isBookValid = validateBook(book);
    if (isBookValid.success && isIdValid.success) {

        if (isIdValid.result != undefined) {
            const result = updateBook(isIdValid.result, book);
            res.json({ statusCode: 200, data: result })
        } else {
            throw new ValidationError(isIdValid.message, 400);
        }
        
    }
    else {
        throw new Error("Books Validaton failes");
    }
}
export const deleteBooks = async (req:Request<{id:string}>,res:Response) => {
    const id=req.params.id;
    const result=validateId(id);
    if(result.success){
        if(result.result !=undefined){
            const bookPresent=deleteBook(result.result)
            res.json({statusCode:200,data:bookPresent})
        }
        else{
            throw new ValidationError(result.message, 400);
        }
    }
    else{
    throw new ValidationError("Id validation Error",400)
    }
}

