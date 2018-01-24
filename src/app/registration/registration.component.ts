import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public errorMessage = '';
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  onclick(email: string, pass: string, fname: string, lname: string, f: NgForm) {
    if (f.valid) {

      this.accountService.register(email, pass, fname, lname).subscribe(
        (response: any) => {
          if (response.status === 'ok') {
            this.accountService.setRegistered(true);
            this.router.navigate(['/']);

          }
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );

    } else {

    }
  }

}
