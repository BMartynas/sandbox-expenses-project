import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { TransactionModule } from '../transaction/transaction.module';
import { AccountModule } from '../account/account.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    AccountModule,
    TransactionModule,
    RouterModule.forChild(routes),
  ],
})
export class MainModule {}
