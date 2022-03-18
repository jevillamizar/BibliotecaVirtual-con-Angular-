import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[BookService]
})
export class HomeComponent implements OnInit {

  public books: Book[] | undefined;
  public url: string;

  constructor(
    private _bookService: BookService
  ) {
    this.url= Global.url;  
   }

  ngOnInit(): void {   
   

    this._bookService.getBooks().subscribe(
      response =>{
        if(response.books){
          this.books = response.books;
        }else{

        }
        
      },
      error =>{
        console.log(error);
      }
    )
  }

}
