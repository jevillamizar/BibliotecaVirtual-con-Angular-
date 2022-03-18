
export class Book{
    constructor(
        public _id: string,
        public title: string,
        public author: string,
        public isbn: string,
        public pages : String,
        public dateP : any,
        public date : any
    ){}
}


/*

"_id" : ObjectId("62338c571de9d7939f78a462"),
    "date" : ISODate("2022-03-17T19:30:31.833Z"),
    "title" : "Teoria de circuitos y Dispositivos Electrónicos",
    "author" : "ROBERT L.BOYLESTAD, LOUIS NASHELSKY",
    "ISBN" : "978-607-442-292-4",
    "pages" : "912",
    "dateP" : ISODate("2009-01-01T00:00:00.000Z"),
*/