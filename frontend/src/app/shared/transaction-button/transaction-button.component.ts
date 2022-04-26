import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-button',
  templateUrl: './transaction-button.component.html',
  styleUrls: ['./transaction-button.component.scss'],
})
export class TransactionButtonComponent {
  @Input() public type!: string;
  @Input() public filter!: string;
  public selected: boolean = true;

  constructor() {}
}
