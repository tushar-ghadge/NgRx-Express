import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {shareReplay, map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  // login(username:string, password:string ) {
  //   return this.http.post('/api/login', {username, password}).pipe(
  //     shareReplay()
  //   )
  // }
  login(username: string, password: string): Observable<any> {
    return this.http.post<{token: string}>('/api/auth', {username: username, password: password})
      .pipe(
        tap(result => this.setSession(result)),
        map(result => {
          return result;
        })
      );
      // return this.http.post<{token: string}>('/api/login', {username, password})
      //       .pipe(tap(res => this.setSession));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }    


  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }   
}
