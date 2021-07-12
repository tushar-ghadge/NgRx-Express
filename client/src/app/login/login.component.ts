import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray, NgModelGroup} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  error: string;

  constructor(private formBuilder: FormBuilder,private snackBar: MatSnackBar, private router : Router, 
    private service: AuthService) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  submit(form: NgForm) {
    if ( this.loginForm.invalid ) {
      this.snackBar.open("Please provide all required fields!", "Incomplete submission", {
        duration: 2000,
      });
      return;
    }

    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;

    // this.service.login(username,password).subscribe((result)=>{
    //   if(result["authenticated"]){
    //     sessionStorage.setItem('user','authenticated');
    //     this.router.navigate(["/dashboard"]);
    //   }else{
    //     this.snackBar.open("Please provide valid credentials!", "Invalid login", {
    //           duration: 2000,
    //     });
    //   }
    // })

    this.service.login(username, password)
      .pipe(first())
      .subscribe(
        result => {
          if(result['idToken']){
            this.router.navigate(['/dashboard']);
          }else{
            this.snackBar.open("Please provide valid credentials!", "Invalid login", {
                        duration: 2000,
            });
          }
              
        }
      );
  }
}
