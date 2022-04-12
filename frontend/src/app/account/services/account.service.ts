import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { IAccount } from 'src/app/shared/models/account.model';
import { APP_CONFIG } from 'src/app/app.config';
import { ICurrency } from 'src/app/shared/models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: IAccount[] = [];
  public selectedAccount!: IAccount;
  private selectedAccountTransactions$: Subject<string> = new Subject<string>();
  private url: string = APP_CONFIG.api.url;

  constructor(private http: HttpClient) {}

  public getTransactionsObservable() {
    return this.selectedAccountTransactions$.asObservable();
  }

  public getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${this.url}/accounts`).pipe(
      tap({
        next: (res: any) => {
          this.accounts = res;
        },
      })
    );
  }

  public getAccountCurrency(accountId: string): Observable<ICurrency> {
    return this.http.get<ICurrency>(
      `${this.url}/accounts/currency/${accountId}`
    );
  }

  public selectAccount(_id: string): void {
    this.selectedAccount = this.accounts.find((acc) => acc._id === _id)!;
    this.selectedAccountTransactions$.next(_id);
  }
}
