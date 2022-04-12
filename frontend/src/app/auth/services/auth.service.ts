import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import * as moment from 'moment';
import { APP_CONFIG } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = APP_CONFIG.api.url;

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.url}/auth/login`, { email, password })
      .pipe(tap((res) => this.setSession(res)));
  }

  private setSession(res: any): void {
    const expiresAt = moment().add(res.expiresIn.substring(0, 2), 'm');
    localStorage.setItem('token', res.token);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('userFullName', res.fullName);
  }

  public isLoggedIn(): boolean {
    const expirationMoment = this.getExpiration();
    if (!expirationMoment) {
      return false;
    }
    return moment().isBefore(expirationMoment);
  }

  public getExpiration(): moment.Moment | null {
    const expiration = localStorage.getItem('expiresAt');
    if (!expiration) {
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
  }
}
