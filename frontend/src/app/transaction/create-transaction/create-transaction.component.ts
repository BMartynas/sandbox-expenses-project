import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from 'src/app/categories/services/category.service';
import { ICategory } from 'src/app/shared/models/category.model';

@UntilDestroy()
@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
  providers: [DatePipe],
})
export class CreateTransactionComponent implements OnInit, OnDestroy {
  private created: boolean = false;
  public selectedCategory!: string;
  public categories!: ICategory[];
  public categoriesByType!: ICategory[];
  public maxDate: Date = new Date();

  public createTransactionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categories: new FormControl('', [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    dateOfTransaction: new FormControl(
      this.datePipe.transform('', 'dd.mm.YYYY'),
      [Validators.required]
    ),
    payee: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private matDialogRef: MatDialogRef<CreateTransactionComponent>,
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
          this.selectTransactionType('expenses');
        },
      });
  }

  public ngOnDestroy(): void {
    this.matDialogRef.close({
      created: this.created,
    });
  }

  public onSave(): void {
    this.transactionsService
      .createTransaction(this.data, {
        type: this.selectedCategory,
        ...this.createTransactionForm.value,
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.created = true;
          this.matDialogRef.close();
        },
      });
  }

  public selectTransactionType(type: string): void {
    this.selectedCategory = type;
    this.categoriesByType = this.categories.filter((cat) => cat.type === type);
  }
}
