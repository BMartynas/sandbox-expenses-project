import { Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/account/services/account.service';
import { TransactionService } from 'src/app/transaction/services/transaction.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public accounts!: IAccount[];
  constructor(
    private accountsService: AccountService,
    public transactionsService: TransactionService
  ) {}

  public ngOnInit(): void {
    this.accountsService.getAccounts().subscribe({
      next: (data) => (this.accounts = data),
    });
  }
}
