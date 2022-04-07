import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITransaction } from 'src/app/shared/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  public getTransactions(accountId: string): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(
      `http://localhost:3000/transactions/account/${accountId}`
    );
  }
}
