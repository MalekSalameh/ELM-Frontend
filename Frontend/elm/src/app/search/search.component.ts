import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  query: string = '';
  books: Book[] = [];
  page: number = 1;
  pageSize: number = 10;
  loading: boolean = false;
  private searchTimeout: any;

  constructor(private bookService: BookService) {}

  ngOnDestroy(): void {
    clearTimeout(this.searchTimeout);
  }

  onSearch(): void {
    if (this.query.trim().length >= 3) { 
      this.page = 1;
      this.books = [];
      this.loadBooks();
    } else {
      this.books = [];  
    }
  }

  onQueryChange(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.onSearch();
    }, 300); 
  }

  onScroll(): void {
    if (!this.loading) {
      this.page++;
      this.loadBooks();
    }
  }

  private loadBooks(): void {
    this.loading = true;
    this.bookService.searchBooks(this.query, this.page, this.pageSize)
      .subscribe((newBooks) => {
        this.books = [...this.books, ...newBooks];
        this.loading = false;
      });
  }
}
