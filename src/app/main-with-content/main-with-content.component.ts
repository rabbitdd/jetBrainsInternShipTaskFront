import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Task } from './task';


@Component({
  selector: 'app-main-with-content',
  templateUrl: './main-with-content.component.html',
  styleUrls: ['./main-with-content.component.css']
})
export class MainWithContentComponent implements OnInit {
  constructor(private modalService: NgbModal, private http: HttpClient, private route: Router) { }
  name = '';
  color = 'white';
  pas = '';
  todo: any[] = [];

  ngOnInit(): void {
    const url = 'http://localhost:8080/task';
    const login = localStorage.getItem('login');
    const password = localStorage.getItem('password');
    if (login != null && password != null) {
      this.name = login;
      this.pas = password;
    }
    console.log(this.name);
    const str: string = login + ':' + password;
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(str))),
    });
    this.http.get(url, {
      headers,
      params: new HttpParams().set('owner', this.name),
    }).subscribe(
      (data: any) => {
        data.forEach((value: Task) => {
          this.todo.push(value);
        });
      }, error => {
        console.log(error.status);
      });
  }

  drop(event: CdkDragDrop<Input[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addAnItemToList(data: string): void {
    const url = 'http://localhost:8080/task';
    const task: Task = new Task();
    task.name = data;
    task.owner = this.name;
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(localStorage.getItem('login') + ':' + localStorage.getItem('password'))});
    this.http.post<Task>(url, task, {
      headers,
      responseType: 'text' as 'json'
    }).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (data: any) => {
        console.log(data);
        this.todo.push(task);
      });
  }

  deleteItemFromList(item: any): void {
    console.log(item);
    const url = 'http://localhost:8080/task';
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(localStorage.getItem('login') + ':' + localStorage.getItem('password'))});
    this.http.get(url, {
      headers,
      params: new HttpParams().set('delete', '1').set('owner', this.name).set('name', item.name),
    }).subscribe(
      (data: any) => {
        console.log(data);
        // tslint:disable-next-line:no-shadowed-variable
        const index = this.todo.indexOf(item, 0);
        if (index > -1) {
          this.todo.splice(index, 1);
        }
      }, error => {
        console.log(error.status);
      });
    const index = this.todo.indexOf(item, 0);
    if (index > -1) {
      this.todo.splice(index, 1);
    }
  }

  changeItemColor(item: any): void {
    const url = 'http://localhost:8080/task';
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(localStorage.getItem('login') + ':' + localStorage.getItem('password'))});
    const index = this.todo.indexOf(item, 0);
    const modalRef = this.modalService.open(ModalComponent).result.then((result) => {
      item.color = result;
      this.http.get(url, {
        headers,
        params: new HttpParams().set('owner', this.name).set('name', item.name).set('color', result),
      }).subscribe(
        (data: any) => {
          console.log(data);
        }, error => {
          console.log(error.status);
        });
    }
    );
  }
  signOut(): void {
    localStorage.setItem('login', '');
    localStorage.setItem('password', '');
    this.route.navigate(['/auth']);
  }
}
