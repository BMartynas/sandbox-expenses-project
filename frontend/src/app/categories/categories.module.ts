import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ExistingComponent } from './existing/existing.component';
import { UpdateExistingComponent } from './update-existing/update-existing.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent,
    CreateCategoryComponent,
    ExistingComponent,
    UpdateExistingComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CategoriesModule {}
