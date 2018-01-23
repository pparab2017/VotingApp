import {EventEmitter, Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModal} from './modals/user.modal';


@Injectable()
export class AccountService {

  menuChanged = new EventEmitter<string>();
  loggedInsuccess = new EventEmitter<boolean>();
  userLoggedIn = false;


  constructor(private http: HttpClient) {}


  changeMenu(loadedMenu: string) {
    this.menuChanged.emit(loadedMenu);
    console.log(loadedMenu);
  }

  getLoginUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  login(username: string, password: string) {
    console.log(username + ' ' + password);
    return this.http.post('http://ec2-13-58-146-253.us-east-2.compute.amazonaws.com/project_api/login',
      {'email': username, 'password': password}).subscribe(
      (response: UserModal) => {
        console.log(response);
        if (response.status === 'ok') {
          this.userLoggedIn = true;
          this.loggedInsuccess.emit(this.userLoggedIn);
          localStorage.setItem('user', JSON.stringify(response));
        }
      },
      (error) => {
        console.log('in the error');
        console.log(error);
      }
    );
  }

}
