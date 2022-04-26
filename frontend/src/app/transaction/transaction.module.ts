import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction/transaction.component';
import { SharedModule } from '../shared/shared.module';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';

@NgModule({
  declarations: [
    TransactionComponent,
    TransactionInfoComponent,
    EditTransactionComponent,
    CreateTransactionComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [TransactionComponent],
})
export class TransactionModule {}
