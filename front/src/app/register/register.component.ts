import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  disableSubmit = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { 
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastNameP: ['', [Validators.required, Validators.minLength(3)]],
      lastNameM: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
  }

  registerUser() {
    if(this.registerForm.valid) {
      this.disableSubmit = true;
      const userData = this.registerForm.value;
      this.userService.insert(userData)
        .subscribe({
          next: () => {
            this.router.navigate(['login']);
          },
          error: () => {
            this.disableSubmit = false;
            alert("Ocurrió un error.");
          }
        })
    }
  }

}
