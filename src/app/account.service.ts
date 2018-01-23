import {EventEmitter, Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModal} from './modals/user.modal';


@Injectable()
export class AccountService {


  loggedInsuccess = new EventEmitter<boolean>();
  userLoggedIn = false;


  constructor(private http: HttpClient) {}


  inAuthenticated() {
    const promise = new Promise(
      ((resolve, reject) => {
        console.log(localStorage.getItem('user'));
        const isLoggedIn = JSON.parse(localStorage.getItem('user')) === null ? false : true;
        resolve(isLoggedIn);
      })
    );
    return promise;
  }

  getLoginUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  storeUserObject(user: UserModal) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.clear();
  }


  login(username: string, password: string) {
    console.log(username + ' ' + password);
    return this.http.post('http://ec2-13-58-146-253.us-east-2.compute.amazonaws.com/project_api/login',
      {'email': username, 'password': password});
  }

}
