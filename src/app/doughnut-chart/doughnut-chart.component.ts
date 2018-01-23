import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent implements OnInit {

  public doughnutChartLabels: string[] = ['Apples', 'Banana', 'Orange', 'Pineapple'];
  public doughnutChartData: number[] = [350, 450, 100, 200];
  public backgroundColor:  any[] = [{ backgroundColor: ['#FF1744', '#F57C00', '#FFD54F', '#FFF59D'] }];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public change(){
    this.doughnutChartData = [700, 450, 100, 200];
  }

  constructor() { }

  ngOnInit() {
  }

}
