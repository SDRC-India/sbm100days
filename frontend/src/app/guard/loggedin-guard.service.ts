import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import {Location} from '@angular/common';

@Injectable()
export class LoggedinGuardService implements CanActivate {

  constructor(private app: AppService, private router: Router, private _location: Location) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(!this.app.checkLoggedIn()){
        return true;
      }else{
        this._location.back();
      }
  }
}
