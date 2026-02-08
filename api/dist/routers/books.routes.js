"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouters = void 0;
const express_1 = require("express");
const books_controller_1 = require("../controllers/books.controller");
exports.booksRouters = (0, express_1.Router)();
exports.booksRouters.get("/", books_controller_1.getBookController);
