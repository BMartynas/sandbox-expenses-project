import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITransaction } from 'src/app/shared/models/transaction.model';
import { APP_CONFIG } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private url: string = APP_CONFIG.api.url;

  constructor(private http: HttpClient) {}

  public getTransactions(accountId: string): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(
      `${this.url}/transactions/account/${accountId}`
    );
  }

  public createTransaction(
    accountId: string,
    properties: ITransaction
  ): Observable<ITransaction> {
    return this.http.post<ITransaction>(
      `${this.url}/transactions/${accountId}`,
      {
        ...properties,
      }
    );
  }

  public updateTransaction(
    id: string,
    updatedProperties: ITransaction
  ): Observable<ITransaction> {
    return this.http.put<ITransaction>(`${this.url}/transactions/${id}`, {
      ...updatedProperties,
    });
  }

  public deleteTransaction(id: string): Observable<ITransaction[]> {
    return this.http.delete<ITransaction[]>(`${this.url}/transactions/${id}`);
  }
}
