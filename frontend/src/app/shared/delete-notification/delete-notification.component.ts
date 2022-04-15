import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountService } from 'src/app/account/services/account.service';
import { TransactionService } from 'src/app/transaction/services/transaction.service';
import { ItemToDelete } from '../enums/item-to-delete.enum';
import { IDeleteItemData } from './delete-item-data.interface';

@UntilDestroy()
@Component({
  selector: 'app-delete-notification',
  templateUrl: './delete-notification.component.html',
  styleUrls: ['./delete-notification.component.scss'],
})
export class DeleteNotificationComponent implements OnDestroy {
  private deleted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDeleteItemData,
    private matDialogRef: MatDialogRef<DeleteNotificationComponent>,
    private accountsService: AccountService,
    private transactionsService: TransactionService
  ) {}

  public onConfirmClick(): void {
    switch (this.data.item) {
      case ItemToDelete.Accout:
        this.accountsService
          .deleteAccount(this.data.id)
          .pipe(untilDestroyed(this))
          .subscribe({
            next: () => {
              this.onNext();
            },
          });
        break;
      case ItemToDelete.Transaction:
        this.transactionsService
          .deleteTransaction(this.data.id)
          .pipe(untilDestroyed(this))
          .subscribe({
            next: () => {
              this.onNext();
            },
          });
    }
  }

  public ngOnDestroy(): void {
    this.matDialogRef.close(this.deleted);
  }

  private onNext(): void {
    this.deleted = true;
    this.matDialogRef.close();
  }
}
