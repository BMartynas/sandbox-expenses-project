import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { AccountInfoComponent } from './account-info/account-info.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountInfoComponent,
    EditAccountComponent,
    CreateAccountComponent,
    DeleteAccountComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [AccountComponent],
})
export class AccountModule {}
