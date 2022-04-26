import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICategory } from 'src/app/shared/models/category.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import {
  CONFIRMATION_DIALOG_CONFIG,
  NOTIFICATION_DIALOG_CONFIG,
} from 'src/app/shared/dialog/dialog.config';
import { ItemToDelete } from 'src/app/shared/enums/item-to-delete.enum';
import { MatDialog } from '@angular/material/dialog';
import { DeleteNotificationComponent } from 'src/app/shared/delete-notification/delete-notification.component';
import { ExistingComponent } from '../existing/existing.component';
import { UpdateExistingComponent } from '../update-existing/update-existing.component';

@UntilDestroy()
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public editing: boolean = false;
  @Input() public category!: ICategory;
  @Output() public successfullyDeleted: EventEmitter<string> =
    new EventEmitter<string>();
  public editCategoryForm!: FormGroup;
  private categoryPattern = '^[a-zA-Z0-9\\s]*$';

  constructor(
    private matDialog: MatDialog,
    private categoriesService: CategoryService
  ) {}

  public ngOnInit(): void {
    this.editCategoryForm = new FormGroup({
      title: new FormControl({ value: this.category.title, disabled: true }, [
        Validators.required,
        Validators.pattern(this.categoryPattern),
      ]),
    });
  }

  public onUpdate(): void {
    const { title } = this.editCategoryForm.value;
    this.categoriesService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (categories) => {
          if (this.categoryExists(title, categories)) {
            this.matDialog.open(UpdateExistingComponent, {
              ...NOTIFICATION_DIALOG_CONFIG,
            });
          } else {
            this.update();
          }
        },
      });
  }

  private categoryExists(title: string, categories: ICategory[]): boolean {
    const categoryIndex = categories.findIndex(
      (cat) =>
        cat.title === title &&
        cat.type === this.category.type &&
        this.category._id !== cat._id
    );
    return categoryIndex !== -1;
  }

  private update(): void {
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
            .subscribe({
              next: (category) => {
                if (category) this.successfullyDeleted.emit(this.category._id);
                else
                  this.matDialog.open(ExistingComponent, {
                    ...NOTIFICATION_DIALOG_CONFIG,
                  });
              },
            });
        }
      });
  }
}
