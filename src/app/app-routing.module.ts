import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWithContentComponent } from './main-with-content/main-with-content.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: 'auth', component: MainComponent},
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'task', component: MainWithContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
