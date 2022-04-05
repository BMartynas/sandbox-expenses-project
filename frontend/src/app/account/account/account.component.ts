import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/transaction/services/transaction.service';
import { IAccount } from '../models/account.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() public account!: IAccount;

  constructor(
    public accountsService: AccountService,
    private transactionsService: TransactionService
  ) {}

  public ngOnInit(): void {
    const defaultSelectedAccount = this.accountsService.accounts[0];
    this.accountsService.selectAccount(defaultSelectedAccount._id);
    this.transactionsService
      .getTransactions(defaultSelectedAccount._id)
      .subscribe({
        next: (data) => {
          this.transactionsService.transactions = data;
        },
      });
  }

  public onAccountClick(): void {
    this.accountsService.selectAccount(this.account._id);
    this.transactionsService.getTransactions(this.account._id).subscribe({
      next: (data) => {
        this.transactionsService.transactions = data;
      },
    });
  }
}
