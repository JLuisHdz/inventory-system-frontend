import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../../shared/models/login-request";
import { Observable, tap } from "rxjs";
import { LoginResponse } from "../../shared/models/login-response";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  Login(request: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    ).pipe(
      tap(response => {

        this.saveToken(response.token);
      })
    );

  }

  saveToken(token: string): void {

    localStorage.setItem('token', token);

  }

  getToken(): string | null {

    return localStorage.getItem('token');

  }

  getAll(page: number, size: number, name?: string) {

    let params: any = {
      page: page,
      size: size,
      sort: 'id,asc'
    };

    if (name && name.trim() !== '') {
      params.name = name;
    }

    return this.http.get<any>(this.apiUrl, { params });
  }

  logout(): void {

    localStorage.removeItem('token');
  }

  getUserRoles(): string[] {
    const token = localStorage.getItem('token');

    if (!token) return [];

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.roles || [];
  }

  getUsername(): string | null {

    const token = localStorage.getItem('token');

    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.sub || payload.username;

  }

  isAdmin(): boolean {
    return this.getUserRoles().some(r => r.includes('ADMIN'));
  }

  isManager(): boolean {
    return this.getUserRoles().some(r => r.includes('MANAGER'));
  }

  isEmployee(): boolean {
    return this.getUserRoles().some(r => r.includes('EMPLOYEE'));
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

}