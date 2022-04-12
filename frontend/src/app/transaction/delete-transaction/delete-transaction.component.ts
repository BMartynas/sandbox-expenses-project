import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TransactionService } from '../services/transaction.service';

@UntilDestroy()
@Component({
  selector: 'app-delete-transaction',
  templateUrl: './delete-transaction.component.html',
  styleUrls: ['./delete-transaction.component.scss'],
})
export class DeleteTransactionComponent implements OnDestroy {
  private deletedTransaction: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    private matDialogRef: MatDialogRef<DeleteTransactionComponent>,
    private transactionsService: TransactionService
  ) {}

  public onConfirmClick(): void {
    this.deletedTransaction = true;
    this.transactionsService
      .deleteTransaction(this.data)
      .pipe(untilDestroyed(this))
      .subscribe();
    this.matDialogRef.close();
  }

  public ngOnDestroy(): void {
    this.matDialogRef.close(this.deletedTransaction);
  }
}
