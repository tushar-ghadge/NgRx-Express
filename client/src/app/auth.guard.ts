import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private routes : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      // if(sessionStorage.getItem('user')!= null){
      //   return true;
      // }else{
      //   this.routes.navigate(['/login']);
      //   return false;
      // }
      if (localStorage.getItem('id_token')) {
        return true;
      }
  
      this.routes.navigate(['/login']);
      return false;
    }
}
