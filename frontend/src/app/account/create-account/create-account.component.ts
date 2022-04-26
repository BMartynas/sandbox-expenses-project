import { Component, Inject, OnDestroy } from '@angular/core';
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
export class CreateAccountComponent implements OnDestroy {
  private created: boolean = false;
  public currencies!: ICurrency[];

  public createAccountForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    currency: new FormControl(
      this.data.find(
        (curr) => curr.country === localStorage.getItem('userCountry')
      )?._id,
      [Validators.required]
    ),
    description: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICurrency[],
    private matDialogRef: MatDialogRef<CreateAccountComponent>,
    private accountsService: AccountService
  ) {}

  public ngOnDestroy(): void {
    this.matDialogRef.close({
      created: this.created,
    });
  }

  public onCreate(): void {
    this.accountsService
      .createAccount(this.createAccountForm.value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.created = true;
          this.matDialogRef.close();
        },
      });
  }
}
