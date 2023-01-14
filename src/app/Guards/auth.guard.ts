import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private _UserService: UserService, private _Router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._UserService.isLogedIn()) {
      return true;

    } else {
      this._Router.navigateByUrl('');
      return false;

    }
  }


}
