import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../User';




@Injectable()
export class SignInUser {
    private url  = 'http://localhost:8080/user/login';
    constructor(private http: HttpClient, private route: Router){}

    signInUser(user: User, modal: NgbActiveModal): void {
        const str = user.login + ':' + user.password;
        console.log('Send ...' + str);
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(str)))});
        console.log(headers);
        this.http.post<User>(this.url, user, {
            headers,
            responseType: 'text' as 'json'
        }).subscribe(data => {
            console.log(data);
            localStorage.setItem('login', user.login);
            localStorage.setItem('password', user.password);
            this.route.navigateByUrl('/task');
            modal.close();

        }, error => {
            console.log(error.status);
            if (error.status === 401) {
                alert('Неверный пароль или логин / Вы не зарегистрированы');
            }
        });
    }
}
