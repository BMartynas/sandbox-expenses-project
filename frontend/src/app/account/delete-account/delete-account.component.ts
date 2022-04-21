import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountService } from '../services/account.service';

@UntilDestroy()
@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnDestroy {
  private deleted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    private matDialogRef: MatDialogRef<DeleteAccountComponent>,
    private accountsService: AccountService
  ) {}

  public onConfirmClick(): void {
    this.accountsService
      .deleteAccount(this.data)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.deleted = true;
          this.matDialogRef.close();
        },
      });
  }

  public ngOnDestroy(): void {
    this.matDialogRef.close(this.deleted);
  }
}
