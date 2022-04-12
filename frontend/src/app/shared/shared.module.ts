import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AddButtonComponent } from './add-button/add-button.component';
import { MatCardModule } from '@angular/material/card';
import { TransactionButtonComponent } from './transaction-button/transaction-button.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AddButtonComponent,
    TransactionButtonComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    AddButtonComponent,
    TransactionButtonComponent,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
