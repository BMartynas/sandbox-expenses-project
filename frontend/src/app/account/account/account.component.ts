import { Component, OnInit, Input } from '@angular/core';
import { IAccount } from 'src/app/shared/models/account.model';
import { AccountService } from '../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { PRIMARY_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { AccountInfoComponent } from '../account-info/account-info.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() public account!: IAccount;

  constructor(
    public accountsService: AccountService,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    const defaultSelectedAccountId = this.accountsService.accounts[0]._id;
    this.accountsService.selectAccount(defaultSelectedAccountId);
  }

  public onAccountClick(_id: string): void {
    this.accountsService.selectAccount(_id);
  }

  public openAccountInfo(): void {
    this.matDialog.open(AccountInfoComponent, {
      data: this.account,
      ...PRIMARY_DIALOG_CONFIG,
    });
  }
}
