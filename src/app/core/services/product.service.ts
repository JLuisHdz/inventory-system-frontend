import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../shared/models/product";
import { PageResponse } from "../../shared/models/page-response";
import { ApiResponse } from "../../shared/models/api-response";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 5) {

        return this.http.get<ApiResponse<PageResponse<Product>>>(
        `${this.apiUrl}?page=${page}&size=${size}&sort=id,asc`
    );
    }

    create(product: any) {
  return this.http.post<any>(`${this.apiUrl}`, product);
}

getById(id: number) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

update(id: number, product: any) {
  return this.http.put<any>(`${this.apiUrl}/${id}`, product);
}

}