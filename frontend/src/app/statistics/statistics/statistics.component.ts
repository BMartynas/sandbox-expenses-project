import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, combineLatest } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { IAccount } from 'src/app/shared/models/account.model';
import { ICurrency } from 'src/app/shared/models/currency.model';
import { StatisticsService } from '../services/statistics.service';
import { ITransaction } from 'src/app/shared/models/transaction.model';
import { TransactionService } from 'src/app/transaction/services/transaction.service';
import { ICategoriesStatistics } from 'src/app/shared/interfaces/categories-statistics.interface';
import { IMonthlyStatistics } from 'src/app/shared/interfaces/monthly-statistics.interface';

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
  public monthlyStatistics!: IMonthlyStatistics[];
  public selectedAccountCurrency!: ICurrency;
  private transactions!: ITransaction[];
  public generated: boolean = false;
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
      .pipe(
        switchMap((accounts) => {
          this.accounts = accounts;
          return this.accountsService.getSelectedAccountObservable();
        }),
        switchMap((selectedAccountId) =>
          combineLatest([
            this.transactionsService.getTransactions(selectedAccountId),
            this.accountsService.getAccountCurrency(selectedAccountId),
          ])
        )
      )
      .pipe(untilDestroyed(this))
      .subscribe(([transactions, currency]) => {
        this.transactions = transactions;
        this.selectedAccountCurrency = currency;
        if (this.generated) this.generateTable();
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

    this.monthlyStatistics = this.statisticsService.getMonthlyStatistics(
      this.transactions,
      start,
      end
    );

    this.generated = true;
  }
}
