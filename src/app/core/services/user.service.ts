import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 5) {
    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&size=${size}`
    );
  }

  create(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  update(id: number, user: any) {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getById(id: number) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

}