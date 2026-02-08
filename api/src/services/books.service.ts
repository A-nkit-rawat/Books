import { success } from "zod";
import { prisma } from "../config/dbConfig"
import { Book } from "../types/common";
import { walkUpBindingElementsAndPatterns } from "typescript";
import { BookNotFoundError } from "../exceptions/AppError";
export const getBooks = async ({ limit, page }: { limit: number, page: number }): Promise<any> => {

    try {
        const result=await prisma.$transaction([
            prisma.books.findMany({
                take: limit,
                skip: (page-1) * limit
            }),
            prisma.books.count({})])
        return {message:"",data:{items:result[0],total:result[1]}};
    }
    catch (e: any) {
        throw e
    }

}
export const getBook = async (id: number) => {
    try {

        const result = await prisma.books.findUnique({ where: { id } })
        if (!result) {
            throw new BookNotFoundError("Book not found", 400)
        }
        return { message: "", data: result }
    }
    catch (e: any) {
        throw e;
    }
}
export const saveBook = async (book: Book): Promise<{ message: string, data: {} }> => {
    try {
        const result = await prisma.books.create({ data: book });
        return { message: "Saved Successfully", data: result };
    }
    catch (e: any) {
        // return { success: false, data: { error: "fail to save data" } }
        throw Error("Book Not Created");
    }
}
export const updateBook = async (id: number, book: Book): Promise<{ message: string, data: {} }> => {
    try {
        const result = await prisma.books.update({
            data: book,
            where: { id },
        })
        return { message: "Updatation Successfull", data: result };
    }
    catch (e: any) {
        console.log(e.message);
        // return { success: false, data: { error: "updatation failed" } }
        throw new Error("Updatation Failed")
    }
}
export const deleteBook = async (id: number) => {
    try {
        const result = await prisma.books.findUnique({ where: { id } });
        if (!result) {
            throw new BookNotFoundError("Book Not Found", 400);
            // return { success: false, data: { error: 'book not found' } };
        }
        const isDelete = await prisma.books.delete({
            where: { id }
        })
        return { message: "Deleted Successfully", data: isDelete }
    }
    catch (e: any) {
        console.log(e.message)
        throw e;
        // return { success: false, data: { error: "book not deleted yet" } }
    }
}
