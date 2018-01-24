import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AccountService} from './account.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { VotingComponent } from './voting/voting.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import {ChartsModule} from 'ng2-charts';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGaurd} from './auth-gaurd.service';
import {HttpModule} from '@angular/http';
import {NoAuthGaurd} from './no-auth-gaurd.service';
import {DropdownDirective} from './directives/dropdown.directive';
import {FormsModule} from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { ErrorComponent } from './error/error.component';



const appRoutes: Routes = [
  {path: '', component: LoginComponent, canActivate: [NoAuthGaurd]},
  {path: 'register', component: RegistrationComponent, canActivate: [NoAuthGaurd]},
  {path: 'home', component: VotingComponent, canActivate: [AuthGaurd]},
  {path: '**', redirectTo: '/not-found'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    VotingComponent,
    DoughnutChartComponent,
    DropdownDirective,
    InfoComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
  RouterModule.forRoot(appRoutes)
  ],
  providers: [AccountService, HttpClient, AuthGaurd, NoAuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
