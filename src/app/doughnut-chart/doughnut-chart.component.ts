import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import {AccountService} from '../account.service';
import {OptionModal} from '../modals/option.modal';


@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent implements OnInit {

  public doughnutChartLabels: string[] = ['Apples', 'Banana', 'Orange', 'Pineapple'];
  public doughnutChartData: number[] = [0, 0, 0, 0, 0];
  public doughnutChartType = 'doughnut';
  private optionsObject: OptionModal[];

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  public change() {
    this.accountService.getUVotes().subscribe(
      (response: any) => {
        if (response.status === 'ok') {
          this.accountService.setOptions(response.voting);
        }
      },
      (error) => {
        console.log('ERROR while fetching Votes: ' + error);
      }
    );
  }

  constructor(private accountService: AccountService) { }

  ngOnInit() {
      this.optionsObject = this.accountService.userOptions;
      this.accountService.options.subscribe(
        (params: OptionModal[]) => {
          const value: number[] = new Array(params.length);
          const text: string[] = new Array(params.length);
          for ( let i = 0; i < params.length; i++) {
            if (params[i].name === 'Apple') {
               value[0] = params[i].val;
            }
            if (params[i].name === 'Banana') {
              value[1] = params[i].val;
            }
            if (params[i].name === 'Orange') {
              value[2] = params[i].val;
            }
            if (params[i].name === 'Pineapple') {
              value[3] = params[i].val;
            }
          }
          this.doughnutChartData  = value;
          this.doughnutChartLabels = text;
        }
      );
  }

}
