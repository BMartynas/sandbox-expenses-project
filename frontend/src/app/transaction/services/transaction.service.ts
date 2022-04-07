import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITransaction } from 'src/app/shared/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transactions!: ITransaction[];

  constructor(private http: HttpClient) {}

  public getTransactions(accountId: string): Observable<any> {
    return this.http
      .get(`http://localhost:3000/transactions/account/${accountId}`)
      .pipe(tap({ next: (res: any) => (this.transactions = res) }));
  }
}
