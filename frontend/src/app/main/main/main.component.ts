import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/account/services/account.service';
import { TransactionService } from 'src/app/transaction/services/transaction.service';
import { ITransaction } from 'src/app/shared/models/transaction.model';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public accounts$!: Observable<IAccount[]>;
  public transactions$!: Observable<ITransaction[]>;

  constructor(
    private accountsService: AccountService,
    public transactionsService: TransactionService
  ) {}

  public ngOnInit(): void {
    this.accounts$ = this.accountsService.getAccounts();
    this.accountsService
      .getTransactionsObservable()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (selectedAccountId) => {
          this.getTransactions(selectedAccountId);
        },
      });
  }

  private getTransactions(_id: string) {
    this.transactions$ = this.transactionsService.getTransactions(_id);
  }

  public trackBy(index: number, item: IAccount | ITransaction): string {
    return item._id;
  }
}
