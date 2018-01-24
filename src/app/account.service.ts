import {EventEmitter, Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {UserModal} from './modals/user.modal';
import {OptionModal} from './modals/option.modal';


@Injectable()
export class AccountService {


  public loggedInsuccess = new EventEmitter<boolean>();
  public options = new EventEmitter<OptionModal[]>();
  public userLoggedIn = false;
  public userOptions: OptionModal[];
  public userRegistered = false;
  private baseURL = 'http://ec2-13-58-146-253.us-east-2.compute.amazonaws.com/';

  constructor(private http: HttpClient) {}

  setOptions(options:  OptionModal[]) {
    this.userOptions = options;
    this.options.emit(options);
  }

  setRegistered(val: boolean) {
    this.userRegistered = val;
  }

  getRegistered() {
    return this.userRegistered ;
  }

  inAuthenticated() {
    const promise = new Promise(
      ((resolve, reject) => {
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
    return this.http.post(this.baseURL + 'voting_app/login',
      {'email': username, 'password': password});
  }



  register(username: string, password: string, fname: string, lname: string) {
    return this.http.post(this.baseURL + 'voting_app/register',
      {'email': username,
        'password': password,
        'fname': fname,
        'lname': lname,
        'gender': 'MALE'});
  }


  getVotes() {
    const user = JSON.parse(localStorage.getItem('user'));
    const auth =  { Authorization: 'Bearer ' + user.token };
    return this.http.get(this.baseURL + 'voting_app/getVotes', {'headers': auth});
  }

  getUVotes() {
    return this.http.get(this.baseURL + 'voting_app/ugetVotes');
  }



  submitVote(name: string) {
    const user = JSON.parse(localStorage.getItem('user'));
    const auth =  { Authorization: 'Bearer ' + user.token };
    return this.http.post(this.baseURL + 'voting_app/vote', {'name': name}, {'headers': auth});
  }

}
