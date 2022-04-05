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

@NgModule({
  declarations: [AddButtonComponent, TransactionButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
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
  ],
})
export class SharedModule {}
