import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { CoreService } from '../../coreService/core-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatCardHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private auth: AuthenticationService,
    private route: Router,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['user'],
      isAdmin: false,
      isActive: false,
    });
  }

  processRegisteration() {
    if (this.registerForm.valid) {
      this.auth.processRegisteration(this.registerForm.value).subscribe(
        (res) => {
          this._coreService.openSnackBar(
            'please contact admin for complete process',
            'Registration successful!'
          );
          //  this.route.navigateByUrl('login')
        },
        (error) => {
          const errorMsg =
            error.error.errors[0]?.msg ||
            'An error occurred during registration.';
          this._coreService.openSnackBar(`Registration failed: ${errorMsg}`);
        }
      );
    } else {
      this._coreService.openSnackBar('please enter valid inputs!');
    }
  }
}
