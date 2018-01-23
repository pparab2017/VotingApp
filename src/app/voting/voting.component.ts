import {Component, OnInit} from '@angular/core';
import {state, trigger, style, transition, animate} from '@angular/animations';


@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css'],
  animations: [
    trigger('divState', [
      state('0', style({
        'width': '{{with}}'
      }) , { params: {with: '5%'}}),
      state('1', style({
        'width': '{{with}}'
      }), { params: {with: '5%'}}),
      // transition('0 => 1', animate(1000)),
      // transition('1 => 0', animate(1000))
    ])
  ]
})
export class VotingComponent implements OnInit {
  votes = [{state: '0', width: '0%', name: 'Apple', val: 0, color: '#FF1744'},
            {state: '0' , width: '0%', name: 'Banana', val: 0, color: '#FFD54F'},
            {state: '0', width: '0%', name: 'Orange', val: 0, color: '#F57C00'},
            {state: '0', width: '0%', name: 'Pineapple', val: 0, color: '#FFF59D'}];
 // voterArray = [0, 0, 0, 0];

  constructor() { }

  animate(val: number) {
    let toChange = this.votes.slice();


    toChange[val].val = toChange[val].val + 1;
    let sum = 0;
    for (const v of toChange) {
      sum = sum + v.val;
    }

    for (let i = 0; i < toChange.length; i++ ) {
      const per = ( toChange[i].val / sum ) * 100;
      toChange[i].width = per + '%';
      toChange[i].state = toChange[i].state === '0' ? '1' : '0';
    }

      toChange = toChange.sort((n1, n2) => n2.val - n1.val);

// use ngstyle instead of animate !



      this.votes = toChange;

    console.log(this.votes);





  }

  ngOnInit() {
  }

}
