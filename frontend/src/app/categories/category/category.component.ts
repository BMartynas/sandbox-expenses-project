import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from 'src/app/shared/models/category.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { CONFIRMATION_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { ItemToDelete } from 'src/app/shared/enums/item-to-delete.enum';
import { MatDialog } from '@angular/material/dialog';
import { DeleteNotificationComponent } from 'src/app/shared/delete-notification/delete-notification.component';

@UntilDestroy()
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public editing: boolean = false;
  @Input() public category!: ICategory;
  public editCategoryForm!: FormGroup;

  constructor(
    private matDialog: MatDialog,
    private categoriesService: CategoryService
  ) {}

  public ngOnInit(): void {
    this.editCategoryForm = new FormGroup({
      title: new FormControl({ value: this.category.title, disabled: true }, [
        Validators.required,
      ]),
    });
  }

  public onUpdate(): void {
    this.categoriesService
      .updateCategory(this.category._id, this.editCategoryForm.value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.editing = false;
          this.editCategoryForm.controls['title'].disable();
        },
      });
  }

  public onEditClick(): void {
    this.editCategoryForm.controls['title'].enable();
    this.editing = true;
  }

  public onDelete(): void {
    const deleteDialogRef = this.matDialog.open(DeleteNotificationComponent, {
      data: ItemToDelete.Category,
      ...CONFIRMATION_DIALOG_CONFIG,
    });
    deleteDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((deleted) => {
        if (deleted) {
          this.categoriesService
            .deleteCategory(this.category._id)
            .pipe(untilDestroyed(this))
            .subscribe();
        }
      });
  }
}
