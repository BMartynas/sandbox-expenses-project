import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/models/category.model';
import { CategoryService } from '../services/category.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PRIMARY_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { MatDialog } from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public categories!: ICategory[];
  public filteredCategories!: ICategory[];
  public filterType: string = '';

  constructor(
    private categoriesService: CategoryService,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.filteredCategories = categories;
        },
      });
  }

  public trackBy(index: number, item: ICategory): string {
    return item._id;
  }

  public openCreateCategoryDialog(): void {
    let createDialogRef = this.matDialog.open(CreateCategoryComponent, {
      ...PRIMARY_DIALOG_CONFIG,
    });

    createDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((created) => {
        if (created) {
          this.categoriesService
            .getCategories()
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (categories) => {
                this.categories = categories;
                this.filteredCategories = categories;
              },
            });
        }
      });
  }

  public onFilterExpenses(): void {
    this.filterType = this.filterType === 'income' ? '' : 'income';
    this.filterCategories();
  }

  public onFilterIncome(): void {
    this.filterType = this.filterType === 'expenses' ? '' : 'expenses';
    this.filterCategories();
  }

  public filterCategories(): void {
    this.filteredCategories = this.categories.filter(
      (category) => category.type !== this.filterType
    );
  }
}
