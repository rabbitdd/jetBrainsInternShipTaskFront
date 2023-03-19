import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {InputTextModule} from 'primeng/inputtext';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignUpUser } from './main/reg/reg-form.service';
import { HttpClientModule } from '@angular/common/http';
import { SignInUser } from './main/login/login-form.service';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { ModalComponent } from './modal/modal.component';
import { MainWithContentComponent } from './main-with-content/main-with-content.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ModalComponent,
    MainWithContentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    NgbModule,
    HttpClientModule,
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,
    TagModule// <--
  ],
  providers: [SignUpUser, SignInUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
