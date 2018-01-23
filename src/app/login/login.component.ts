import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {UserModal} from '../modals/user.modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  onclick(email: string, pass: string) {
    this.accountService.login(email, pass);
  }
  ngOnInit() {
  }

}
