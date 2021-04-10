import { HttpClient, HttpHeaders } from "@angular/common/http";
import { error } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "../User";




@Injectable()
export class SignInUser {
    private url: string  = "http://localhost:8080/signIn";
    constructor(private http: HttpClient, private route: Router){}

    signInUser(user: User, modal: NgbActiveModal) {
        let str = user.login + ":" + user.password;
        console.log("Send ..." + str);
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(str)))});
        console.log(headers);
        this.http.post<User>(this.url, user, {
            headers: headers,
            responseType: "text" as 'json'
        }).subscribe(data => {
            console.log(data);
            localStorage.setItem('login', user.login);
            localStorage.setItem('password', user.password);
            this.route.navigateByUrl("/mainContent");
            modal.close();
            
        }, error => {
            console.log(error.status);
            if (error.status === 401) {
                alert("Неверный пароль или логин / Вы не зарегистрированы");
            }
        });
    }
}