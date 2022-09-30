import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Lending } from "../models/lending";
import { configs } from "../configs";
import { BookLending } from "../models/book-lending";

@Injectable({
    providedIn: 'root'
})
export class LendingService {
    constructor(private http: HttpClient) {}

    insert(lending: Lending): Observable<Lending> {
        return this.http.post<Lending>(configs.BACKEND_BASE_URL + "/api/lending", lending);
    }

    update(lending: Lending): Observable<Lending> {
        return this.http.put<Lending>(configs.BACKEND_BASE_URL + "/api/lending", lending);
    }

    delete(lending: Lending): Observable<Lending> {
        return this.http.delete<Lending>(configs.BACKEND_BASE_URL + "/api/lending/" + lending.id);
    }

    list():Observable<BookLending[]> {
        return this.http.get<BookLending[]>(configs.BACKEND_BASE_URL + "/api/lending");
    }

    listNotReturned() {
        return this.http.get<BookLending[]>(configs.BACKEND_BASE_URL + "/api/lending?onlyNotReturned=true");
    }

    get(lendingId: Number):Observable<Lending> {
        return this.http.get<Lending>(configs.BACKEND_BASE_URL + "/api/lending/" + lendingId);
    }
}