import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from './subscriptions.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SubscriptionsModule {}
