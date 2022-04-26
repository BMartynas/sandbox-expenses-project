import { Component, Input } from '@angular/core';
import { ICurrency } from 'src/app/shared/models/currency.model';
import { ITransaction } from 'src/app/shared/models/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  @Input() public transaction!: ITransaction;
  @Input() public currency!: ICurrency;

  constructor() {}
}
