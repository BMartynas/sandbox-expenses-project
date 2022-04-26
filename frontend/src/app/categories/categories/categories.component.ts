import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  public showDeletedNotification: boolean = false;
  public searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });

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
    const createDialogRef = this.matDialog.open(CreateCategoryComponent, {
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

  public onFilter(type: string): void {
    if (this.filterType === type) this.filterType = '';
    else this.filterType = type;
    this.filterCategories();
  }

  public filterCategories(): void {
    const { searchTerm } = this.searchForm.value;
    this.filteredCategories = this.categories.filter(
      (category) =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        category.type !== this.filterType
    );
  }

  public onDeletedCategory(id: string): void {
    this.filteredCategories = this.categories.filter(
      (category) => category._id !== id
    );
    this.showDeletedNotification = true;
    this.hideNotification();
  }

  private hideNotification(): void {
    setTimeout(() => {
      this.showDeletedNotification = false;
    }, 5000);
  }
}
