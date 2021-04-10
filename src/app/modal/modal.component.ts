import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MainWithContentComponent } from '../main-with-content/main-with-content.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) { }

  color: string = "white";
  ngOnInit(): void {
  }

  changeItemColor(color: string) {
    this.color = color;
    this.activeModal.close(color);
  }

}
function Input() {
  throw new Error('Function not implemented.');
}

