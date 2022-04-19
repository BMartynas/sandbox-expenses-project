import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AccountModule } from '../account/account.module';

const routes: Routes = [
  {
    path: 'Statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountModule,
    RouterModule.forChild(routes),
  ],
})
export class StatisticsModule {}
