import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpUser } from './reg/reg-form.service';
import { User } from './User';
import { SignInUser } from './login/login-form.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  templateUrl: './login/login-form.html',
  styleUrls: ['./login/login-form.css']
})
export class NgbdFormLogContentComponent {
  constructor(public activeModal: NgbActiveModal, private SignIn: SignInUser) {}
  submit(login: string, password: string): void {
    const user: User = {login, password};
    this.SignIn.signInUser(user, this.activeModal);
  }
}

@Component({
  templateUrl: './reg/reg-form.html',
  styleUrls: ['./reg/reg-form.css']
})

export class NgbdFormRegContentComponent {
  constructor(public activeModal: NgbActiveModal, private SignUp: SignUpUser) {}
  submit(login: string, password: string): void {
    const user: User = {login, password};
    this.SignUp.signUpUser(user, this.activeModal);
  }
}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {
  todo: any[] = [];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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
  addAnItemToList(data: any): void {
    this.todo.push(data);
  }

  deleteItemFromList(item: any): void {
    const index = this.todo.indexOf(item, 0);
    if (index > -1) {
      this.todo.splice(index, 1);
    }
  }

  changeItemColor(): void {
    this.modalService.open(ModalComponent);
  }

  loginForm(): void {
    this.modalService.open(NgbdFormLogContentComponent);
  }

  regForm(): void {
    this.modalService.open(NgbdFormRegContentComponent);
  }
}
