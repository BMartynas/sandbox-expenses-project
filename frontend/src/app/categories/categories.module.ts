import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateCategoryComponent } from './create-category/create-category.component';

const routes: Routes = [
  {
    path: 'Categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent,
    CreateCategoryComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CategoriesModule {}
