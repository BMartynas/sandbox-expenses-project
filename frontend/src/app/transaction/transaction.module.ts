import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction/transaction.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TransactionComponent],
  imports: [CommonModule, SharedModule],
  exports: [TransactionComponent],
})
export class TransactionModule {}
