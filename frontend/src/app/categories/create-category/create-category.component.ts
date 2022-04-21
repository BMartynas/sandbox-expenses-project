import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialogRef } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnDestroy {
  private created: boolean = false;
  public selectedType: string = 'expenses';
  public createCategoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(
    private matDialogRef: MatDialogRef<CreateCategoryComponent>,
    private categoriesService: CategoryService
  ) {}

  public onCreate(): void {
    this.categoriesService
      .createCategory({
        type: this.selectedType,
        ...this.createCategoryForm.value,
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.created = true;
          this.matDialogRef.close();
        },
      });
  }

  public ngOnDestroy(): void {
    this.matDialogRef.close({
      created: this.created,
    });
  }

  public selectType(categoryType: string): void {
    this.selectedType = categoryType;
  }
}
