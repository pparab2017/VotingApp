import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AccountService} from './account.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { VotingComponent } from './voting/voting.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    VotingComponent,
    DoughnutChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [AccountService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
