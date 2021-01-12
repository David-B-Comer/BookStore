import {Component, OnInit} from '@angular/core';
import {Book} from './book/book';
import {BookService} from './book/book-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'BookStore';
  books: Book[];

  constructor(private router: Router, private bookService: BookService) {
  }

  getBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  addBook(): void {
    this.router.navigate(['add-book'])
      .then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
  };

  deleteBook(book) { this.bookService.deleteBook(book.id); this.router.navigate(['list-books']); }

  deleteAllowed() { return this.splitIoService.isTreatmentOn('allow-delete'); }

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      this.getBooks();
    });
    this.splitioService.initSdk();
  }
}
