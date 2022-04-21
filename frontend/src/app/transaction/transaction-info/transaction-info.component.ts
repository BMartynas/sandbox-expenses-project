import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITransaction } from 'src/app/shared/models/transaction.model';
import { MatDialog } from '@angular/material/dialog';
import { CONFIRMATION_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICategory } from 'src/app/shared/models/category.model';
import { PRIMARY_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';
import { ICurrency } from 'src/app/shared/models/currency.model';
import { ItemToDelete } from 'src/app/shared/enums/item-to-delete.enum';
import { DeleteNotificationComponent } from 'src/app/shared/delete-notification/delete-notification.component';
import { TransactionService } from '../services/transaction.service';

@UntilDestroy()
@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss'],
})
export class TransactionInfoComponent implements OnDestroy {
  private deletedTransaction: boolean = false;
  private editedTransaction: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ITransaction & ICurrency,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<TransactionInfoComponent>,
    private transactionsService: TransactionService
  ) {}

  public ngOnDestroy(): void {
    this.matDialogRef.close({
      deletedTransaction: this.deletedTransaction,
      editedTransaction: this.editedTransaction,
      transactionId: this.data._id,
    });
  }

  public onEditClick(): void {
    const editDialogRef = this.matDialog.open(EditTransactionComponent, {
      data: this.data,
      ...PRIMARY_DIALOG_CONFIG,
    });
    editDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data.edited) {
          this.editedTransaction = true;
          this.matDialogRef.close();
        }
      });
  }

  public onCloseClick(): void {
    this.matDialogRef.close();
  }

  public onDeleteClick(): void {
    const deleteDialogRef = this.matDialog.open(DeleteNotificationComponent, {
      data: ItemToDelete.Transaction,
      ...CONFIRMATION_DIALOG_CONFIG,
    });
    deleteDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((deleted) => {
        if (deleted) {
          this.transactionsService
            .deleteTransaction(this.data._id)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: () => {
                this.deletedTransaction = true;
                this.matDialogRef.close();
              },
            });
        }
      });
  }

  public trackBy(index: number, item: ICategory): string {
    return item._id;
  }
}
