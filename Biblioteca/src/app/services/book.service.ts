import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Book } from "../models/book.model"; 
import { Global } from "./global";

@Injectable() 
export class BookService{

    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    pruebas(){
        return "Soy el servicio de libros";
    }
    
    
    getBooks():Observable<any>{
               

        return this._http.get(this.url + 'books')
        
    }
    
}
