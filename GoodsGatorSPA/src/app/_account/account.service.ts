import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../_shared/interfaces/iUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl + 'account/';
  currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Route) { }

  login(creds: any) {
    return this.createRequest(creds, 'login');
  }

  register(creds: any) {
    return this.createRequest(creds, 'register');
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }

  checkEmail(email:string) {
    return this.http.get(this.baseUrl + 'checkemail?email=' + email);
  }

  createRequest(creds: any, action: string) {
    return this.http.post(this.baseUrl + action, creds).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }
}
