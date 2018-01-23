

import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AccountService} from './account.service';

@Injectable()
export class NoAuthGaurd implements CanActivate, CanActivateChild {

  constructor(private authService: AccountService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return  this.authService.inAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            this.router.navigate(['/home']);
          } else {
            return true;
          }
        }
      );
  }


  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
