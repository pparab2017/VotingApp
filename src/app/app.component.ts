import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  loggedIn = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {

    if (this.accountService.getLoginUser()) {
      this.loggedIn = true;
    }

    this.accountService.loggedInsuccess.subscribe(
      (isTrue: boolean) => {
        this.loggedIn = isTrue;
      }
    );

    this.accountService.getUVotes().subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.accountService.setOptions(response.voting);
        }
      },
      (error) => {
        console.log('ERROR: While fetching Votes: ' + error);
      }
    );

  }

}
