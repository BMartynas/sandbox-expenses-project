import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-notification',
  templateUrl: './delete-notification.component.html',
  styleUrls: ['./delete-notification.component.scss'],
})
export class DeleteNotificationComponent implements OnDestroy {
  private deleted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private matDialogRef: MatDialogRef<DeleteNotificationComponent>
  ) {}

  public onConfirmClick(): void {
    this.deleted = true;
    this.matDialogRef.close();
  }

  public ngOnDestroy(): void {
    this.matDialogRef.close(this.deleted);
  }
}
