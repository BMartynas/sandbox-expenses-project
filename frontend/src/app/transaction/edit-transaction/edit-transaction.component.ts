import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ITransaction } from 'src/app/shared/models/transaction.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from 'src/app/categories/services/category.service';
import { ICategory } from 'src/app/shared/models/category.model';

@UntilDestroy()
@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss'],
  providers: [DatePipe],
})
export class EditTransactionComponent implements OnInit, OnDestroy {
  private edited: boolean = false;
  public selectedCategory!: string;
  public categories!: ICategory[];
  public categoriesByType!: ICategory[];
  public maxDate: Date = new Date();

  public editTransactionForm: FormGroup = new FormGroup({
    title: new FormControl(this.data.title, [Validators.required]),
    categories: new FormControl(
      this.data.categories.map((cat) => cat._id),
      [Validators.required]
    ),
    amount: new FormControl(this.data.amount, [Validators.required]),
    dateOfTransaction: new FormControl(
      this.datePipe.transform(this.data.dateOfTransaction, 'yyyy-MM-dd'),
      [Validators.required]
    ),
    payee: new FormControl(this.data.payee),
    description: new FormControl(this.data.description),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ITransaction,
    private matDialogRef: MatDialogRef<EditTransactionComponent>,
    private transactionsService: TransactionService,
    private categoriesService: CategoryService,
    private datePipe: DatePipe
  ) {}

  public ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.selectTransactionType(this.data.type);
        },
      });
  }

  public ngOnDestroy(): void {
    this.matDialogRef.close({
      edited: this.edited,
    });
  }

  public onSave(): void {
    this.transactionsService
      .updateTransaction(this.data._id, {
        type: this.selectedCategory,
        ...this.editTransactionForm.value,
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.edited = true;
          this.matDialogRef.close();
        },
      });
  }

  public selectTransactionType(type: string): void {
    this.selectedCategory = type;
    this.categoriesByType = this.categories.filter((cat) => cat.type === type);
  }
}
