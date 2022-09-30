import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user";
import { configs } from "../configs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    insert(user: User): Observable<User> {
        return this.http.post<User>(configs.BACKEND_BASE_URL + "/api/user", user);
    }

    update(user: User): Observable<User> {
        return this.http.put<User>(configs.BACKEND_BASE_URL + "/api/user", user);
    }

    delete(user: User): Observable<User> {
        return this.http.delete<User>(configs.BACKEND_BASE_URL + "/api/user/" + user.id);
    }

    list():Observable<User[]> {
        return this.http.get<User[]>(configs.BACKEND_BASE_URL + "/api/user");
    }

    get(userId: Number):Observable<User> {
        return this.http.get<User>(configs.BACKEND_BASE_URL + "/api/user/" + userId);
    }
}