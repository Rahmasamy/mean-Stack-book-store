
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCommonModule, MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthorServiceService } from '../services/authorService/author-service.service';
import { CoreService } from '../coreService/core-service.service';

@Component({
  selector: 'app-author-pop-up',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './author-pop-up.component.html',
  styleUrls: ['./author-pop-up.component.css']
})
export class AuthorPopUpComponent {
  authorForm: FormGroup;
  formData: FormData = new FormData(); // Add this to hold the FormData for file uploads
  Authors: any[] = [];
  selectedFile: File | null = null;
  constructor(
    private fb: FormBuilder,
    private authorService: AuthorServiceService,
    private dialogRef: MatDialogRef<AuthorPopUpComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.authorForm = this.fb.group({
      firstName: ['', [Validators.minLength(3)]],
      lastName: ['', [Validators.minLength(3)]],
      imagePaths: [null] ,
      Category_id:['',Validators.minLength(3)],
      desc:['',Validators.minLength(5)],
      DateOfBirth:['',Validators.minLength(4)]

    });
  }

  ngOnInit(): void {
    this.authorForm.patchValue(this.data);
  }
  onFileSelected(event:Event){
    const input=event.target as HTMLInputElement
    console.log(input)
    if(input.files && input.files.length > 0){
      this.selectedFile = input.files[0];
      console.log("image selected")
      console.log(this.selectedFile)

    }

  }

  onFormSubmit() {
        if (this.authorForm.valid) {
          let formData: any;
          formData = new FormData();
          formData.append('firstName', this.authorForm.get('firstName')?.value);
          formData.append('lastName', this.authorForm.get('lastName')?.value);
          formData.append('Category_id', this.authorForm.get('Category_id')?.value);
          formData.append('DateOfBirth', this.authorForm.get('DateOfBirth')?.value);
          formData.append('desc', this.authorForm.get('desc')?.value);
          formData.append('imagePaths', this.selectedFile);

           if (this.data) {
            this.authorService
              .updateAuthor(this.data._id, formData)
              .subscribe({
                next: (val: any) => {
                  this._coreService.openSnackBar('book detail updated!');
                  console.log(this.data);
                  this.dialogRef.close(true);
                },
                error: (err: any) => {
                  console.error(err);
                },
              });
          } else {
            this.authorService.createAuthor(formData).subscribe({

              next: (val: any) => {
                this._coreService.openSnackBar('book added successfully');
                this.dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              },
            });
          }
        }
      }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
}

