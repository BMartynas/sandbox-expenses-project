import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObligatoryComponent } from './obligatory/obligatory.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'obligatory',
    component: ObligatoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [ObligatoryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ObligatoryModule {}
