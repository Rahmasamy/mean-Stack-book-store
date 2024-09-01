import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { CoreService } from '../../coreService/core-service.service';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatCardHeader, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userdata: any;
  userProfile: any;
  constructor(
    private builder: FormBuilder,
    private auth: AuthenticationService,
    private route: Router,
    private _coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  processLogin() {
    if (this.loginForm.valid) {
      this.auth.processLogin(this.loginForm.value).subscribe(
        (res: any) => {
          this.userdata = res;
          this.userProfile = res.data;
          this._coreService.openSnackBar(
            'please contact admin for complete process',
            'login successful!'
          );
          console.log(res);
          console.log(this.userProfile);
          localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
          localStorage.setItem('userToken', this.userdata.token);
          console.log(this.userdata.token);
          console.log(this.userdata.data.isAdmin);
          localStorage.setItem('role', this.userdata.data.isAdmin);
          this.auth.decodeUserData();

          this.route.navigate(['/landing']);
        },
        (error) => {
          this._coreService.openSnackBar(
            `An error occurred during signin ${error} .', 'login failed`
          );
        }
      );
    } else {
      this._coreService.openSnackBar('please enter valid inputs!');
    }
  }
}
