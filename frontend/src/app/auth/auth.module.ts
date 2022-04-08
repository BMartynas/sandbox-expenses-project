import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthFormComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
