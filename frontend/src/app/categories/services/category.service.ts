import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { APP_CONFIG } from 'src/app/app.config';
import { ICategory } from 'src/app/shared/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = APP_CONFIG.api.url;

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.url}/categories`);
  }
}
