import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICurrency } from 'src/app/shared/models/currency.model';
import { AccountService } from '../services/account.service';

@UntilDestroy()
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit, OnDestroy {
  private created: boolean = false;
  public currencies!: ICurrency[];

  public createAccountForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    currency: new FormControl(null, [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private matDialogRef: MatDialogRef<CreateAccountComponent>,
    private accountsService: AccountService
  ) {}

  public ngOnInit(): void {
    this.accountsService
      .getAllCurrencies()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.currencies = data;
        },
      });
  }

  public ngOnDestroy(): void {
    this.matDialogRef.close({
      created: this.created,
    });
  }

  public onCreate(): void {
    this.accountsService
      .createAccount(this.createAccountForm.value)
      .pipe(untilDestroyed(this))
      .subscribe();
    this.created = true;
    this.matDialogRef.close();
  }
}
