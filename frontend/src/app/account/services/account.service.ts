import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { IAccount } from 'src/app/shared/models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: IAccount[] = [];
  public selectedAccount!: IAccount;
  private selectedAccountTransactions$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  public getTransactionsObservable() {
    return this.selectedAccountTransactions$.asObservable();
  }

  public getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>('http://localhost:3000/accounts').pipe(
      tap({
        next: (res: any) => {
          this.accounts = res;
        },
      })
    );
  }

  public selectAccount(_id: string): void {
    this.selectedAccount = this.accounts.find((acc) => acc._id === _id)!;
    this.selectedAccountTransactions$.next(_id);
  }
}
