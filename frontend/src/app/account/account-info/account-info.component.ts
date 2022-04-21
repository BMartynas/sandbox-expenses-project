import { IAccount } from 'src/app/shared/models/account.model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CONFIRMATION_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PRIMARY_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { DeleteNotificationComponent } from 'src/app/shared/delete-notification/delete-notification.component';
import { ItemToDelete } from 'src/app/shared/enums/item-to-delete.enum';
import { AccountService } from '../services/account.service';

@UntilDestroy()
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAccount,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<AccountInfoComponent>,
    private accountsService: AccountService
  ) {}

  public onEditClick(): void {
    const editDialogRef = this.matDialog.open(EditAccountComponent, {
      data: this.data,
      ...PRIMARY_DIALOG_CONFIG,
    });
    editDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data.edited) {
          this.matDialogRef.close();
        }
      });
  }

  public onDeleteClick(): void {
    const deleteDialogRef = this.matDialog.open(DeleteNotificationComponent, {
      data: ItemToDelete.Accout,
      ...CONFIRMATION_DIALOG_CONFIG,
    });
    deleteDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((deleted) => {
        if (deleted) {
          this.accountsService
            .deleteAccount(this.data._id)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: () => {
                this.matDialogRef.close();
              },
            });
        }
      });
  }
}
