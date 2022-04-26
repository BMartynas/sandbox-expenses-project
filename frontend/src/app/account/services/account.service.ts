import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, switchMap } from 'rxjs';
import { IAccount } from 'src/app/shared/models/account.model';
import { APP_CONFIG } from 'src/app/app.config';
import { ICurrency } from 'src/app/shared/models/currency.model';
import { TransactionService } from 'src/app/transaction/services/transaction.service';
import { ITransaction } from 'src/app/shared/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: IAccount[] = [];
  public selectedAccount!: IAccount;
  private selectedAccount$: Subject<string> = new Subject<string>();
  private accountsChange$: Subject<boolean> = new Subject<boolean>();
  private url: string = APP_CONFIG.api.url;

  constructor(
    private http: HttpClient,
    private transactionsService: TransactionService
  ) {}

  public getSelectedAccountObservable(): Observable<string> {
    return this.selectedAccount$.asObservable();
  }

  public getAccountsChangeObservable(): Observable<boolean> {
    return this.accountsChange$.asObservable();
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

  public createAccount(properties: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>(`${this.url}/accounts`, {
      ...properties,
    });
  }

  public updateAccount(
    id: string,
    updatedProperties: IAccount
  ): Observable<IAccount> {
    this.accountsChange$.next(true);
    return this.http.put<IAccount>(`${this.url}/accounts/${id}`, {
      ...updatedProperties,
    });
  }

  public deleteAccount(id: string): Observable<IAccount[]> {
    return this.http.delete<IAccount[]>(`${this.url}/accounts/${id}`);
  }

  public getAccountCurrency(accountId: string): Observable<ICurrency> {
    return this.http.get<ICurrency>(
      `${this.url}/accounts/currency/${accountId}`
    );
  }

  public getAllCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(`${this.url}/currencies`);
  }

  public selectAccount(_id: string): void {
    this.selectedAccount = this.accounts.find((acc) => acc._id === _id)!;
    this.selectedAccount$.next(_id);
  }

  public calculateTotalAmount(transactions: ITransaction[]): number {
    let total: number = 0;
    for (const transaction of transactions) {
      if (transaction.type === 'expenses') {
        total -= transaction.amount;
      } else {
        total += transaction.amount;
      }
    }
    return total;
  }
}
