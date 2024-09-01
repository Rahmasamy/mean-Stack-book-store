import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCommonModule, MatOption } from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookserviceService } from '../services/bookService/bookservice.service';
import { CoreService } from '../coreService/core-service.service';
import { CategoryserviceService } from '../services/categoryService/categoryservice.service';
import { AuthorServiceService } from '../services/authorService/author-service.service';
@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,
    MatInputModule,MatOption,MatSelectModule,ReactiveFormsModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {

  bookForm: FormGroup;
  categories: any[] = [];
  Authors: any[] = [];
  selectedFile:File | null =null
  constructor(
    private fb: FormBuilder,
    private bookService: BookserviceService,
    private dialogRef: MatDialogRef<PopUpComponent>,
    private _coreService: CoreService,
    private CategoryService:CategoryserviceService,
    private AuthorService:AuthorServiceService,

    @Inject(MAT_DIALOG_DATA) public data: any, ) {
      console.log(data);
      this.bookForm = this.fb.group({

        title: ['', [Validators.minLength(3)]],
        // imagePaths: ['', [Validators.minLength(3)]],
        Author_id: ['', [Validators.minLength(3)]],
        Category_id: ['', [Validators.minLength(3)]],
        Author: ['', [Validators.minLength(3)]],
        Category: ['', [Validators.minLength(3)]],
        rating:['',Validators.minLength(1)],
        desc:['',Validators.minLength(4)],
        reviews:['']

      });

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

  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
    this.getCategories();
    this.getAuthors()
  }

  getCategories(): void {
    this.CategoryService.getCategories().subscribe(
      (response) => {

        this.categories = response.data; // Access the 'data' key
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  getAuthors(): void {
    this.AuthorService.getAuthors().subscribe(
      (response) => {

        this.Authors = response.data; // Access the 'data' key
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
  onFormSubmit() {
    if (this.bookForm.valid) {
      let formData: any;
      if (this.selectedFile) {
        console.log("hello")
        formData = new FormData();
        formData.append('title', this.bookForm.get('title')?.value);
        formData.append('imagePaths', this?.selectedFile);
        formData.append('desc', this.bookForm.get('desc')?.value);
        formData.append('Category_id', this.bookForm.get('Category_id')?.value);
        formData.append('Author_id', this.bookForm.get('Author_id')?.value);
        formData.append('rating', this.bookForm.get('rating')?.value);
        formData.append('reviews', this.bookForm.get('reviews')?.value);
        formData.append('Author', this.bookForm.get('Author')?.value);
        formData.append('Category', this.bookForm.get('Category')?.value);

      }
      if (this.data) {


        this.bookService
          .AdminUpdateBook(this.data._id, formData)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('book details updated!');
              console.log(this.data);
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        console.log("author")
        console.log(formData.get('title'))
        this.bookService.createBook(formData).subscribe({
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


  closeDialog() {
    this.dialogRef.close(true);
  }
}
