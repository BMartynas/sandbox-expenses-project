import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-button',
  templateUrl: './transaction-button.component.html',
  styleUrls: ['./transaction-button.component.scss'],
})
export class TransactionButtonComponent {
  @Input() type!: string;

  constructor() {}
}
