import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule], // 👈 ESTA LÍNEA ES CLAVE
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {

  console.log("ProductListComponent loaded");

  this.loadProducts();

}

  loadProducts(): void {

  this.productService
      .getAll(this.currentPage, this.pageSize)
      .subscribe({

        next: response => {

          this.products = response.data.content;
          this.totalPages = response.data.totalPages;

        },

        error: err => {

          console.error('Error loading products', err);

        }

      });

}

nextPage(): void {

  if (this.currentPage < this.totalPages - 1) {

    this.currentPage++;
    this.loadProducts();

  }

}

previousPage(): void {

  if (this.currentPage > 0) {

    this.currentPage--;
    this.loadProducts();

  }

}
}