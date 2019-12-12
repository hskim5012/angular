import { IUser } from 'src/app/shared/user';
import {  Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()

export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string) {

    const loginInfo = { username: userName, password};
    const options =  { headers: new HttpHeaders({'Content-type': 'application/json'})};
    return this.http.post('/api/login', loginInfo, options)
    .pipe(tap(data => {
      this.currentUser = <IUser>data;
    })).pipe(catchError(err => {
      return of(false);
    }));

  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    // * Also needs to add .subscribe() to NgOnInit() app.componentS
    // this.http.get('/api/currentIdentity').subscribe(data => {
      // if(data instanceof Object){
        // this.currentUser = <IUser>data;
      // }
    // })

    this.http.get('/api/currentIdentity').pipe(tap(data => {
      if (data instanceof Object) {
        this.currentUser = <IUser>data;}}));
  }


  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    const options = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };

    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  logout() {
    this.currentUser = undefined;

    const options = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };
    return this.http.post('/api/logout', {}, options);
  }
}
