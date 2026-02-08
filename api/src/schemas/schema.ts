import z from "zod";

export const bookSchema= z.object({
    title:z.string(),
    author:z.string(),
    description:z.string(),
    rating:z.coerce.number("not a number").lt(6).gt(0)
})
export const idSchema=z.coerce.number().int().positive()