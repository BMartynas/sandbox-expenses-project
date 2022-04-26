import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/account/services/account.service';
import { TransactionService } from 'src/app/transaction/services/transaction.service';
import { ITransaction } from 'src/app/shared/models/transaction.model';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { TransactionInfoComponent } from 'src/app/transaction/transaction-info/transaction-info.component';
import { PRIMARY_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { ICurrency } from 'src/app/shared/models/currency.model';
import { CreateTransactionComponent } from 'src/app/transaction/create-transaction/create-transaction.component';
import { CreateAccountComponent } from 'src/app/account/create-account/create-account.component';

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public accounts$!: Observable<IAccount[]>;
  public transactions!: ITransaction[];
  public filteredTransactions!: ITransaction[];
  public showDeletedNotification: boolean = false;
  public deletedItemName: string = '';
  private selectedAccountId!: string;
  public selectedAccountCurrency!: ICurrency;
  public filterType: string = '';
  public currencies!: ICurrency[];
  public searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });

  constructor(
    private accountsService: AccountService,
    public transactionsService: TransactionService,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getAccounts();
    this.accountsService
      .getAccountsChangeObservable()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.getAccounts();
        },
      });
    this.accountsService
      .getSelectedAccountObservable()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (selectedAccountId) => {
          this.selectedAccountId = selectedAccountId;
          this.getTransactions(selectedAccountId);
          this.getCurrency(selectedAccountId);
        },
      });
    this.accountsService
      .getAllCurrencies()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.currencies = data;
        },
      });
  }

  private getAccounts(): void {
    this.accounts$ = this.accountsService.getAccounts();
  }

  private getTransactions(_id: string): void {
    this.transactionsService
      .getTransactions(_id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          this.filteredTransactions = transactions;
        },
      });
  }

  private getCurrency(id: string): void {
    this.accountsService
      .getAccountCurrency(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (currency) => {
          this.selectedAccountCurrency = currency;
        },
      });
  }

  public trackBy(index: number, item: IAccount | ITransaction): string {
    return item._id;
  }

  public openTransactionDialog(transaction: ITransaction): void {
    const { _id, ...currencyPayload } = this.selectedAccountCurrency;
    const transactionDialogRef = this.matDialog.open(TransactionInfoComponent, {
      data: { ...transaction, ...currencyPayload },
      ...PRIMARY_DIALOG_CONFIG,
    });
    transactionDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data.deletedTransaction) {
          this.deletedItemName = 'Transaction';
          this.showDeletedNotification = true;
          this.removeDeletedAccount(data.transactionId);
          this.hideNotification();
          this.getAccounts();
        } else if (data.editedTransaction) {
          this.getTransactions(this.selectedAccountId);
          this.getAccounts();
        }
      });
  }

  public openCreateTransactionDialog(): void {
    const transactionDialogRef = this.matDialog.open(
      CreateTransactionComponent,
      {
        data: this.selectedAccountId,
        ...PRIMARY_DIALOG_CONFIG,
      }
    );
    transactionDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data.created) {
          this.getTransactions(this.selectedAccountId);
          this.getAccounts();
        }
      });
  }

  public openCreateAccountDialog(): void {
    const accountDialogRef = this.matDialog.open(CreateAccountComponent, {
      data: this.currencies,
      ...PRIMARY_DIALOG_CONFIG,
    });
    accountDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((created) => {
        if (created) {
          this.getAccounts();
        }
      });
  }

  private hideNotification(): void {
    setTimeout(() => {
      this.showDeletedNotification = false;
    }, 5000);
  }

  private removeDeletedAccount(id: string): void {
    this.transactions = this.transactions.filter((trans) => trans._id !== id)!;
  }

  public onFilter(type: string): void {
    if (this.filterType === type) this.filterType = '';
    else this.filterType = type;
    this.filterTransactions();
  }

  public filterTransactions(): void {
    const { searchTerm } = this.searchForm.value;
    this.filteredTransactions = this.transactions.filter(
      (trans) =>
        trans.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        trans.type !== this.filterType
    );
  }

  public onAccountDelete(): void {
    this.deletedItemName = 'Account';
    this.showDeletedNotification = true;
    this.hideNotification();
    this.getAccounts();
  }
}
