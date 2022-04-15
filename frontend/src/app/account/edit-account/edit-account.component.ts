import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAccount } from 'src/app/shared/models/account.model';
import { ICurrency } from 'src/app/shared/models/currency.model';
import { AccountService } from '../services/account.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit, OnDestroy {
  private edited: boolean = false;
  public currencies!: ICurrency[];

  public editAccountForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    currency: new FormControl(this.data.currency._id, [Validators.required]),
    description: new FormControl(this.data.description),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAccount,
    private matDialogRef: MatDialogRef<EditAccountComponent>,
    private accountsService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountsService
      .getAllCurrencies()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.currencies = data;
        },
      });
  }

  ngOnDestroy(): void {
    this.matDialogRef.close({
      edited: this.edited,
    });
  }

  public onSave(): void {
    this.accountsService
      .updateAccount(this.data._id, this.editAccountForm.value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.edited = true;
          this.matDialogRef.close();
        },
      });
  }
}
