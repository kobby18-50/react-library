export type BOOKS = {
    _id : string,
    title : string,
    content : string,
    genre : string,
    author : string,
    year : Date
}[]

export type CARDBOOK = {
    book : {
     _id : string,
     title : string,
     content : string,
     genre : string,
     author : string,
     year : Date
    }
 }

 export type BOOK = {
    _id : string,
     title : string,
     content : string,
     genre : string,
     author : string,
     year : string
 }