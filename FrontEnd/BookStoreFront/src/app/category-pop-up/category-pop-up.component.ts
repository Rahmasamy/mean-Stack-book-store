import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatOption } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryserviceService } from '../services/categoryService/categoryservice.service';
import { CoreService } from '../coreService/core-service.service';

@Component({
  selector: 'app-category-pop-up',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './category-pop-up.component.html',
  styleUrl: './category-pop-up.component.css',
})
export class CategoryPopUpComponent {
  categoryForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileName = '';
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryserviceService,
    private dialogRef: MatDialogRef<CategoryPopUpComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.minLength(3)],
      imagePaths: [null],
      desc: ['', Validators.minLength(4)],
    });
  }

  ngOnInit(): void {
    this.categoryForm.patchValue(this.data);
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onFormSubmit() {
    if (this.categoryForm.valid) {
      let formData: any;

      if (this.selectedFile) {
        formData = new FormData();
        formData.append('name', this.categoryForm.get('name')?.value);
        formData.append('imagePaths', this.selectedFile);
        formData.append('desc', this.categoryForm.get('desc')?.value);
      }

      if (this.data) {
        this.categoryService.updateCategory(this.data._id, formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Category updated!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this.categoryService.createCategory(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Category added successfully');
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
