import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IAccount } from 'src/app/shared/models/account.model';
import { AccountService } from '../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PRIMARY_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { AccountInfoComponent } from '../account-info/account-info.component';
import { TransactionService } from 'src/app/transaction/services/transaction.service';

@UntilDestroy()
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() public account!: IAccount;
  @Output() public deleted: EventEmitter<void> = new EventEmitter<void>();
  public totalAmount!: number;

  constructor(
    public accountsService: AccountService,
    public transactionsService: TransactionService,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    const defaultSelectedAccountId = this.accountsService.accounts[0]._id;
    this.accountsService.selectAccount(defaultSelectedAccountId);
    this.transactionsService
      .getTransactions(this.account._id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (transactions) => {
          this.totalAmount =
            this.accountsService.calculateTotalAmount(transactions);
        },
      });
  }

  public onAccountClick(_id: string): void {
    this.accountsService.selectAccount(_id);
  }

  public openAccountInfo(): void {
    const infoDialogRef = this.matDialog.open(AccountInfoComponent, {
      data: this.account,
      ...PRIMARY_DIALOG_CONFIG,
    });
    infoDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((deleted) => {
        if (deleted) {
          this.deleted.emit();
        }
      });
  }
}
