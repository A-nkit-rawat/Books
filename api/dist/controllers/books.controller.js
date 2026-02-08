"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookController = void 0;
const queryParams_validators_1 = require("../validators/queryParams.validators");
const books_service_1 = require("../services/books.service");
const getBookController = async (req, res) => {
    const queryParams = req.query;
    const { limit, page } = (0, queryParams_validators_1.validateAndModifyGetBookQueryParams)(queryParams);
    const result = await (0, books_service_1.getBooks)({ limit, page });
    res.status(200).json(result);
};
exports.getBookController = getBookController;
