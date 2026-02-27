import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../../shared/models/login-request";
import { Observable, tap } from "rxjs";
import { LoginResponse } from "../../shared/models/login-response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient){}

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

    logout(): void {

        localStorage.removeItem('token');
    }
}