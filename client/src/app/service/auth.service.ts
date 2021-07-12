import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  authenticateUser(uname: string, pwd : string){
    if(uname == "test" && pwd =="test"){
    sessionStorage.setItem('username',"admin");
    return true;
    }else{
      return false;
    }
  }

}
