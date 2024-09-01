import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CoreService } from '../coreService/core-service.service';
import { CategoryserviceService } from '../services/categoryService/categoryservice.service';
import { AuthenticationService } from '../services/authenticationService/authentication.service';

@Component({
  selector: 'app-user-pop-up-componet',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-pop-up-componet.component.html',
  styleUrl: './user-pop-up-componet.component.css',
})
export class UserPopUpComponetComponent {
  userForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileName = '';
  constructor(
    private fb: FormBuilder,
    private userService: AuthenticationService,
    private dialogRef: MatDialogRef<UserPopUpComponetComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.minLength(3)],
      email: ['', Validators.minLength(10)],
      password: ['', Validators.minLength(8)],
      role: ['', Validators.minLength(3)],
      isAdmin: ['', Validators.minLength(1)],
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      let formData: any;
      console.log('ehehehhehehehhehehehehehehe');
      console.log('sl,a;lmcvs;l,mvl;sz,cl;sa,dl;,fl;sad,vl;fs');
      formData = new FormData();
      formData.append('name', this.userForm.get('name')?.value);
      formData.append('email', this.userForm.get('email')?.value);
      formData.append('password', this.userForm.get('password')?.value);
      formData.append('isAdmin', this.userForm.get('isAdmin')?.value);
      formData.append('role', this.userForm.get('role')?.value);
      console.log(this.userForm.get('role')?.value);
      if (this.selectedFile) {
        formData.append('imagePaths', this.selectedFile);
      }

      if (this.data) {
        console.log(this.data._id);
        this.userService
          .updateUserAdmin(this.data._id, this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('user updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.userService.createNewUser(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('user added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  closeDialog() {
    this.dialogRef.close(true);
  }
}
