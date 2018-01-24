import { Component, OnInit } from '@angular/core';
import {AccountService} from '../account.service';
import {Router} from '@angular/router';
import {UserModal} from '../modals/user.modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) {
    router.events.subscribe((val) => {

      if (this.accountService.getLoginUser()) {
        this.user = this.accountService.getLoginUser();
        this.username = this.user.userFname + ' ' + this.user.userLname;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  username: string;
  isLoggedIn = false;
  user: UserModal = new UserModal();
  ngOnInit() {
  }


  logout() {
    this.accountService.logout();
    this.router.navigate(['/'] );
  }


}
