import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { configs } from "../configs";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient){

    }
    private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public $isLoggedIn = this._isLoggedIn.asObservable();

    private _user: ReplaySubject<User> = new ReplaySubject<User>();
    public $user = this._user.asObservable();


    public validateUser(email: string, password: string) {
        let body = {email, password};
        return this.http.post<User>(configs.BACKEND_BASE_URL + "/api/login", body)
            .subscribe({
                next: user => {
                    if(user && user.email != null) {
                        this._isLoggedIn.next(true);
                        this._user.next(user);
                    }
                    else {
                        this._isLoggedIn.next(false);
                    }
                },
                error: error=> {
                    if(error && error.status == 401) {
                        this._isLoggedIn.next(false);
                    }
                }
            });
    }
}