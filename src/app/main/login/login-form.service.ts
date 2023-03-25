import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../User';

const url = 'http://localhost:8080/user/login';

@Injectable()
export class SignInUser {
    constructor(private http: HttpClient, private route: Router){}
    signInUser(user: User, modal: NgbActiveModal): void {
        const str = user.login + ':' + user.password;
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(str)))});
        this.http.post<User>(url, user, {
            headers,
            responseType: 'text' as 'json'
        }).subscribe((data: any) => {
            const currentUser = JSON.parse(data);
            localStorage.setItem('login', currentUser.login);
            localStorage.setItem('password', currentUser.password);
            this.route.navigateByUrl('/task');
            modal.close();
        }, error => {
            if (error.status === 401) {
                alert('Неверный пароль или логин / Вы не зарегистрированы');
            }
        });
    }
}
