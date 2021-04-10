import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
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
  name: string = "";
  color: string = "white";
  pas: string = "";
  todo: any[] = [];
  // todo:any[] = [
  //   // 'Get to work',
  //   // 'Pick up groceries',
  //   // 'Go home',
  //   // 'Fall asleep'
  // ];

  ngOnInit(): void {
    let url: string = "http://localhost:8080/mainContent";
    let login = localStorage.getItem('login');
    let password = localStorage.getItem('password');
    if (login != null && password != null) {
      this.name = login;
      this.pas = password;
    }
    console.log(this.name);
    let str: string = login + ":" + password;
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(unescape(encodeURIComponent(str))),
    });
    this.http.get(url, {
      headers,
      params: new HttpParams().set('owner', this.name),
      //responseType: "text" as 'json'
    }).subscribe(
      (data: any) => {
        console.log(data);
        data.forEach((value: Task) => {
          this.todo.push(value);
          // this.valueForLocalStorage = this.initLocalStorage(value);
          // localStorage.setItem('points',this.valueForLocalStorage);
          
        });
      }, error => {
        console.log(error.status);
      });
  }

  drop(event: CdkDragDrop<Input[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addAnItemToList(data: string) {

    let url: string = "http://localhost:8080/mainContent";
    let task: Task = new Task();
    task.name = data;
    task.owner = this.name;
    console.log("yes");
    console.log(task);
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(localStorage.getItem('login') + ":" + localStorage.getItem('password'))});
    this.http.post<Task>(url, task, {
      headers: headers,
      responseType: "text" as 'json'
    }).subscribe(
      (data: any) => {
        console.log(data);
        this.todo.push(task);
      });
  }

  deleteItemFromList(item: any) {
    console.log(item);
    let url: string = "http://localhost:8080/mainContent";
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(localStorage.getItem('login') + ":" + localStorage.getItem('password'))});
    this.http.get(url, {
      headers,
      params: new HttpParams().set('delete', "1").set('owner', this.name).set('name', item.name),
      //responseType: "text" as 'json'
    }).subscribe(
      (data: any) => {
        console.log(data);
        const index = this.todo.indexOf(item, 0);
        if (index > -1) {
          this.todo.splice(index, 1);
        }
      }, error => {
        console.log(error.status);
      });


    console.log(item);
    const index = this.todo.indexOf(item, 0);
    if (index > -1) {
      this.todo.splice(index, 1);
    }
    console.log(this.todo);
    console.log('delete');
  }

  changeItemColor(item: any) {
    let url: string = "http://localhost:8080/mainContent";
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(localStorage.getItem('login') + ":" + localStorage.getItem('password'))});
    
    const index = this.todo.indexOf(item, 0);
    const modalRef = this.modalService.open(ModalComponent).result.then((result) => {
      item.color = result;
      this.http.get(url, {
        headers,
        params: new HttpParams().set('owner', this.name).set('name', item.name).set('color', result),
        //responseType: "text" as 'json'
      }).subscribe(
        (data: any) => {
          console.log(data);
        }, error => {
          console.log(error.status);
        });
    }
    );
  }
  signOut() {
    localStorage.setItem('login','');
    localStorage.setItem('password', '');
    this.route.navigate(['/main']);
  }
}
