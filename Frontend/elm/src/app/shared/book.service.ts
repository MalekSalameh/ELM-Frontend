import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:7284/api/Books'; 

  constructor(private http: HttpClient) {}

  searchBooks(query: string, page: number, pageSize: number): Observable<Book[]> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Book[]>(this.apiUrl + '/search', { params });
  }
}
