import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Book } from "../models/book";
import { configs } from "../configs";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    constructor(private http: HttpClient) {}

    insert(book: Book): Observable<Book> {
        return this.http.post<Book>(configs.BACKEND_BASE_URL + "/api/book", book);
    }

    update(book: Book): Observable<Book> {
        return this.http.put<Book>(configs.BACKEND_BASE_URL + "/api/book", book);
    }

    delete(book: Book): Observable<Book> {
        return this.http.delete<Book>(configs.BACKEND_BASE_URL + "/api/book/" + book.id);
    }

    list():Observable<Book[]> {
        return this.http.get<Book[]>(configs.BACKEND_BASE_URL + "/api/book");
    }

    get(bookId: Number):Observable<Book> {
        return this.http.get<Book>(configs.BACKEND_BASE_URL + "/api/book/" + bookId);
    }
}