import { HttpClient, HttpHeaders } from "@angular/common/http";
import { error } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { User } from "../User";

@Injectable()
export class SignUpUser {
    url: string = "http://localhost:8080/signUp";

    constructor(private http: HttpClient, private route: Router) {}


    signUpUser(user: User, modal: NgbActiveModal) {
        const body = {name: user.login, age: user.password};
        console.log("Send ... signUp");
        this.http.post<User>(this.url, user, {
            responseType: "text" as 'json'
        }).subscribe((data: any) => {
            if (data === "bad") {
                alert("Пользователь с таким логином уже существует !");
            } else {
                localStorage.setItem('login', user.login);
                localStorage.setItem('password', user.password);
                this.route.navigateByUrl("/mainContent");
                modal.close();

            }
            console.log(data);
        }, error => {
            console.log(error);
        });
        
        let str = user.login + ":" + user.password;
        // const headers = new HttpHeaders({
        // Authentication: 'Basic ' + btoa(unescape(encodeURIComponent(str)))});
        // return this.http.post<User>(this.url, user, {
        //   //headers: headers,
        //   responseType: "text" as 'json'
        // }).pipe();
    }

}