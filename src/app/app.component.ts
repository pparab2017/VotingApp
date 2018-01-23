import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Voting App';
  loggedIn = false;

  selectedMenu = 'login';
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    localStorage.clear();
    if (this.accountService.getLoginUser()) {
      this.loggedIn = true;
    }
    this.accountService.menuChanged.subscribe(
      (menu: string) => {
        this.selectedMenu = menu;
      }
    );

    this.accountService.loggedInsuccess.subscribe(
      (isTrue: boolean) => {
        this.loggedIn = isTrue;
      }
    );

  }

}
