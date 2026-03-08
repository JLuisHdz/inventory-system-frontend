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

  getAll(page: number = 0, size: number = 5, searchTerm?: string) {

    let params: any = {
      page: page,
      size: size,
      sort: 'id,asc'
    };

    if (searchTerm && searchTerm.trim().length > 0) {
      params.name = searchTerm;
    }

    return this.http.get<ApiResponse<PageResponse<Product>>>(
      this.apiUrl,
      { params }
    );
  }

  getById(id: number) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

  create(product: any) {
    return this.http.post<any>(this.apiUrl, product);
  }

  update(id: number, product: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getStats() {
  return this.http.get<any>(`${this.apiUrl}/stats`);
}

}