"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndModifyGetBookQueryParams = void 0;
const validateAndModifyGetBookQueryParams = (queryParams) => {
    const responseQueryParams = { limit: 10, page: 1 };
    if (queryParams == undefined || queryParams == null) {
        return responseQueryParams;
    }
    if (!(queryParams.limit === null) && !(queryParams.limit === undefined) && !(isNaN(Number(queryParams.limit)))) {
        const limit = Math.round(Number(queryParams.limit));
        if (limit > 0 && limit < 11) {
            responseQueryParams.limit = Math.round(Number(queryParams.limit));
        }
    }
    if (!(queryParams.page === null) && !(queryParams.page === undefined) && !(isNaN(Number(queryParams.page))) && Number(queryParams.page) > 0) {
        responseQueryParams.page = Math.round(Number(queryParams.page));
    }
    return responseQueryParams;
};
exports.validateAndModifyGetBookQueryParams = validateAndModifyGetBookQueryParams;
// test
// const test={
//     limit:"-2",
//     page:"26"
// }
// const test2={
//     limit:"5",
//     page:"ankit"
// }
// const test3={
// }
// const test4={
//     limit:"45"
// }
// const test5={
//     limit:"fakls"
// }
// const test6={
//     page:"45.21"
// }
// console.log(validateAndModifyGetBookQueryParams(test))
// console.log(validateAndModifyGetBookQueryParams(test2))
// console.log(validateAndModifyGetBookQueryParams(test3))
// console.log(validateAndModifyGetBookQueryParams(test4))
// console.log(validateAndModifyGetBookQueryParams(test5))
// console.log(validateAndModifyGetBookQueryParams(test6))
