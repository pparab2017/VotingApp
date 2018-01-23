import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {UserModal} from '../modals/user.modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  onclick(email: string, pass: string) {
    this.accountService.login(email, pass).subscribe(
      (response: UserModal) => {
        console.log(response);
        if (response.status === 'ok') {
          this.router.navigate(['/home'] );
          this.accountService.userLoggedIn = true;
          this.accountService.storeUserObject(response);
        }
      },
      (error) => {
        console.log('in the error');
        console.log(error);
      }
    );


  }
  ngOnInit() {
  }

}
