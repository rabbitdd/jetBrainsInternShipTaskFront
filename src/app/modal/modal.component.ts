import { Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) { }

  color = 'white';
  ngOnInit(): void {
  }

  changeItemColor(color: string): void {
    this.color = color;
    this.activeModal.close(color);
  }

}
