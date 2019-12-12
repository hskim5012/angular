import { Injectable } from '@angular/core';
import { IUserSettings } from './user.settings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSubscriptionTypes(): Observable<Object> {
    return  of(['Monthly', 'Annual', 'Lifetime']);
  }

  postUserSettingsForm(userSettings: IUserSettings): Observable <any>{
    // return of(userSettings);
    return this.http.post('https://putsreq.com/i2w5Xw6Oct7XIjABeOo5', userSettings);
   }
}
