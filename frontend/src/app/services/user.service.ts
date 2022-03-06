import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; //nombre con el que queda exportado es en mnúscula porque es un vble (No una class) y así está escrita en environment.ts

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }
  registerUser(user: any) {
    return this._http.post<any>(this.env + 'user/register', user);
  }
  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }
}
