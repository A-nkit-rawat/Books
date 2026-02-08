export interface GetBooksQueryParams{
    limit?:string,
    page?:string
}
export interface Book{
    title:string|null,
    author:string|null,
    description:string|null,
    rating:number
}
export interface ResponseBook{
    id:number,
    title:string|null,
    author:string|null,
    description:string|null,
    rating:number
}