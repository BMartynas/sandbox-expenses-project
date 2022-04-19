import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/services/account.service';
import { IAccount } from 'src/app/shared/models/account.model';
import { ICurrency } from 'src/app/shared/models/currency.model';
import { StatisticsService } from '../services/statistics.service';
import { ITransaction } from 'src/app/shared/models/transaction.model';
import { TransactionService } from 'src/app/transaction/services/transaction.service';
import { ICategoriesStatistics } from 'src/app/shared/interfaces/categories-statistics.interface';

@UntilDestroy()
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public accounts!: IAccount[];
  public selectedStatistics: string = 'categories';
  public totalExpenses: string = '';
  public categoriesStatistics!: ICategoriesStatistics[];
  public selectedAccountCurrency!: ICurrency;
  private transactions!: ITransaction[];
  public dateRange = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
  });

  constructor(
    private accountsService: AccountService,
    private statisticsService: StatisticsService,
    private transactionsService: TransactionService
  ) {}

  public ngOnInit(): void {
    this.accountsService
      .getAccounts()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (accounts) => {
          this.accounts = accounts;
        },
      });
    this.accountsService
      .getSelectedAccountObservable()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (selectedAccountId) => {
          this.transactionsService
            .getTransactions(selectedAccountId)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (transactions) => {
                this.transactions = transactions;
              },
            });
          this.accountsService
            .getAccountCurrency(selectedAccountId)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (currency) => {
                this.selectedAccountCurrency = currency;
              },
            });
        },
      });
  }

  public trackBy(index: number, item: IAccount): string {
    return item._id;
  }

  public selectStatistics(type: string): void {
    this.selectedStatistics = type;
  }

  public generateTable(): void {
    const { start, end } = this.dateRange.value;

    this.totalExpenses =
      this.statisticsService.getTotalExpenses(this.transactions, start, end) +
      this.selectedAccountCurrency.symbol;

    this.categoriesStatistics = this.statisticsService.getCategoriesStatistics(
      this.transactions,
      start,
      end
    );
  }
}
