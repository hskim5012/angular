import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { userRoutes } from './user.routes';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JQ_TOKEN } from '../common/jQuery.service';

const jQuery = window['$'];

@NgModule({
  declarations: [
    ProfileComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes),
  ],
  providers: [
    { provide: JQ_TOKEN, useValue: jQuery },
  ],
})
export class UserModule { }
