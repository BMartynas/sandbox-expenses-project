import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from 'src/app/transaction/services/transaction.service';
import { IAccount } from 'src/app/shared/models/account.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() public account!: IAccount;

  constructor(public accountsService: AccountService) {}

  public ngOnInit(): void {
    const defaultSelectedAccountId = this.accountsService.accounts[0]._id;
    this.accountsService.selectAccount(defaultSelectedAccountId);
  }

  public onAccountClick(_id: string): void {
    this.accountsService.selectAccount(_id);
  }
}
