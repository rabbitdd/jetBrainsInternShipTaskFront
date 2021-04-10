import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { convertCompilerOptionsFromJson } from 'typescript';
import { SignUpUser } from './reg/reg-form.service';
import { Router } from '@angular/router';
import { User } from './User';
import { SignInUser } from './login/login-form.service';
import { ModalComponent } from '../modal/modal.component';

// @Component({
//   //selector: 'ngbd-modal-content',
//   templateUrl: 'popUpColor.html',
//   styleUrls: ['popUpColor.css']
// })
// export class NgbdModalContent {
//   constructor(public activeModal: NgbActiveModal) {}
// }

@Component({
  //selector: 'ngbd-modal-content',
  templateUrl: './login/login-form.html',
  styleUrls: ['./login/login-form.css']
})
export class NgbdFormLogContent {
  constructor(public activeModal: NgbActiveModal, private SignIn: SignInUser, private route: Router) {}
  submit(login: string, password: string) {
    // console.log(login + " : " + password);
    let user: User = {login, password};
    console.log(user);
    this.SignIn.signInUser(user, this.activeModal);
  }
}

@Component({
  //selector: 'ngbd-modal-content',
  templateUrl: './reg/reg-form.html',
  styleUrls: ['./reg/reg-form.css']
})
export class NgbdFormRegContent {
  constructor(public activeModal: NgbActiveModal, private SignUp: SignUpUser, private route: Router) {}
  submit(login: string, password: string) {
    // console.log(login + " : " + password);
    let user: User = {login, password};
    console.log(user);
    this.SignUp.signUpUser(user, this.activeModal);
  }
  
}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  template: '<input type="text" name="item" placeholder="item">'
})


export class MainComponent implements OnInit {
  todo:any[] = [
    // 'Get to work',
    // 'Pick up groceries',
    // 'Go home',
    // 'Fall asleep'
  ];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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

  addAnItemToList(data: String) {
    console.log(this.todo);
    this.todo.push(data);
  }

  deleteItemFromList(item: any) {
    console.log(item);
    const index = this.todo.indexOf(item, 0);
    if (index > -1) {
      this.todo.splice(index, 1);
    }
    console.log(this.todo);
    console.log('delete');
  }

  changeItemColor() {
    const modalRef = this.modalService.open(ModalComponent);
  }

  loginForm() {
    const modalRef = this.modalService.open(NgbdFormLogContent);
  }

  regForm() {
    const modalRef = this.modalService.open(NgbdFormRegContent);
  }

  
}
