import { IAccount } from 'src/app/shared/models/account.model';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CONFIRMATION_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PRIMARY_DIALOG_CONFIG } from 'src/app/shared/dialog/dialog.config';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';

@UntilDestroy()
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnDestroy {
  private edited: boolean = false;
  private deleted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAccount,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<AccountInfoComponent>
  ) {}

  ngOnDestroy(): void {
    this.matDialogRef.close({
      edited: this.edited,
      deleted: this.deleted,
    });
  }

  public onEditClick(): void {
    let editDialogRef = this.matDialog.open(EditAccountComponent, {
      data: this.data,
      ...PRIMARY_DIALOG_CONFIG,
    });
    editDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data.edited) {
          this.edited = true;
          this.matDialogRef.close();
        }
      });
  }

  public onDeleteClick(): void {
    let deleteDialogRef = this.matDialog.open(DeleteAccountComponent, {
      data: this.data._id,
      ...CONFIRMATION_DIALOG_CONFIG,
    });
    deleteDialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((deleted) => {
        if (deleted) {
          this.deleted = true;
          this.matDialogRef.close();
        }
      });
  }
}
