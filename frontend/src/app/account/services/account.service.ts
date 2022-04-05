import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IAccount } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts: IAccount[] = [];
  public selectedAccount!: IAccount;

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<any> {
    return this.http
      .get('http://localhost:3000/accounts')
      .pipe(tap({ next: (res: any) => (this.accounts = res) }));
  }

  public selectAccount(_id: string): void {
    const account = this.accounts.find((acc) => acc._id === _id);
    this.selectedAccount = account!;
  }
}
