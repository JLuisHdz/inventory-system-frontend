import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getAll() {
  return this.http.get<any>(this.apiUrl, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}
}
