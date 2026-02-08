"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = void 0;
const dbConfig_1 = require("../config/dbConfig");
const getBooks = async ({ limit, page }) => {
    const result = await dbConfig_1.prisma.books.findMany({
        take: limit,
        skip: page * limit
    });
    const total = await dbConfig_1.prisma.books.count({});
    return { result, total };
};
exports.getBooks = getBooks;
