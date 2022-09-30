import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { skip, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  isPasswordIncorrect = false;
  loginSuscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
    
    let subs = this.authService.$isLoggedIn
    .pipe(skip(1))
    .subscribe({
      next: (loggedIn) => {
        if(loggedIn) {
          this.router.navigate(['prestamos']) 
        }
        else {
          this.isPasswordIncorrect = true;
        }
        this.isLoading = false;
      }
    });
    this.loginSuscription.add(subs);
  }

  ngOnDestroy(): void {
      this.loginSuscription.unsubscribe();
  }

  validateUser() {
    this.isLoading = true;
    if(!this.loginForm.valid) {
      return;
    }

    const userValue = this.loginForm.value;
    this.authService.validateUser(userValue.email, userValue.password);
  }

}
