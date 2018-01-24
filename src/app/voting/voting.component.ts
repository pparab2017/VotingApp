import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {UserModal} from '../modals/user.modal';
import {OptionModal} from '../modals/option.modal';
import {isUndefined} from 'util';



@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  public votes: OptionModal[];
  public loggedInUser: UserModal;
  public userImage = 'assets/girl.png';
  public userVote = '';
  public isWaiting = false;

  constructor(private accountService: AccountService) {
    this.votes = new Array<OptionModal>();
  }

  reorderOptions() {
    let toChange = this.votes;
    let sum = 0;
    for (const v of  toChange) {
      sum = sum + v.val;
    }
    for (let i = 0; i < toChange.length; i++ ) {
      const per = ( toChange[i].val / sum ) * 100;
      toChange[i].width =  per + '%';
    }
    toChange = toChange.sort((n1, n2) => n2.val - n1.val);
    this.votes = toChange;
  }

  submitVote() {
    this.isWaiting = true;
    this.accountService.submitVote(this.userVote).subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.accountService.setOptions(response.voting);
          this.votes = this.accountService.userOptions;
          this.loggedInUser = response.user;
          this.reorderOptions();
          this.isWaiting = false;
        }
      },
      (error) => {
        console.log('ERROR while fetching Votes: ' + error);
        this.isWaiting = false;
      }
    );
    this.reorderOptions();
  }

  onclick(uservote: string) {
    this.userVote = uservote;
  }

  ngOnInit() {
    this.loggedInUser = this.accountService.getLoginUser() ? this.accountService.getLoginUser() : new UserModal();
    if (this.loggedInUser.gender === 'MALE') {
      this.userImage = 'assets/boy.png';
    }


    this.accountService.reflectNewChange.subscribe(
      (response: any) => {
        this.votes = response.options;
        this.loggedInUser = response.user;
        this.reorderOptions();
      },
      (error) => {
        console.log('ERROR while fetching Votes: ' + error);
      }
    );

    if (isUndefined(this.accountService.userOptions)) {
        this.accountService.getVotes().subscribe(
          (response: any) => {
            if (response.status === 'ok') {
              this.accountService.setOptions(response.voting);
              this.votes = this.accountService.userOptions;
              this.loggedInUser = response.user;
              this.reorderOptions();
            }
          },
          (error) => {
            console.log('ERROR while fetching Votes: ' + error);
          }
        );
    } else {
        this.votes = this.accountService.userOptions;
        this.reorderOptions();
    }

  }

}
