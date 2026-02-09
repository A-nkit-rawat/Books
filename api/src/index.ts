import express from 'express'
import { booksRouters } from './routers/books.routes';
import { allExceptionHandler } from './exceptions/allException';
import cors from "cors"
const app= express();
app.use(cors({origin:"*"}))
app.use(express.json());
app.use("/api",booksRouters)
app.use(allExceptionHandler)
app.listen(3000,()=>{})
