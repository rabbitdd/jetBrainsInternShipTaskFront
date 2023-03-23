import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../User';

const url = 'http://localhost:8080/user/reg';

@Injectable()
export class SignUpUser {
    constructor(private http: HttpClient, private route: Router) {}
    signUpUser(user: User, modal: NgbActiveModal): void {
        this.http.post<User>(url, user, {
            responseType: 'text' as 'json'
        }).subscribe(() => {
            localStorage.setItem('login', user.login);
            localStorage.setItem('password', user.password);
            this.route.navigateByUrl('/task').then();
            modal.close();
        }, error => {
            console.log(error);
            alert('Пользователь с таким логином уже существует !');
        });
    }
}
