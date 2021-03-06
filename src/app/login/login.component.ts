import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {UserModal} from '../modals/user.modal';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }
  public registerdJustnow: boolean;
  public errorMessage = '';

  onclick(email: string, pass: string, valid: NgForm) {
    if (valid.valid) {
      this.accountService.login(email, pass).subscribe(
        (response: any) => {
          if (response.status === 'ok') {
            this.router.navigate(['/home']);
            this.accountService.userLoggedIn = true;
            this.accountService.storeUserObject(response.user);
            this.accountService.setOptions(response.voting);
          }
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );

    }
  }

  ngOnInit() {
    this.registerdJustnow = this.accountService.getRegistered();
    this.accountService.setRegistered(false);
  }

}
