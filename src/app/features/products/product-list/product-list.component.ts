import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5;
  isLoading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {

  console.log("ProductListComponent loaded");

  this.loadProducts();

}

  loadProducts(): void {

  this.isLoading = true;

  this.productService
    .getAll(this.currentPage, this.pageSize)
    .subscribe({

      next: response => {

        this.products = response.data.content;
        this.totalPages = response.data.totalPages;
        this.isLoading = false;

      },

      error: err => {

        console.error('Error loading products', err);
        this.isLoading = false;

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

deleteProduct(id: number): void {

  const confirmDelete = confirm('Are you sure you want to delete this product?');

  if (!confirmDelete) return;

  this.productService.delete(id).subscribe({

    next: () => {
      this.loadProducts(); // recarga la tabla
    },

    error: err => {
      console.error('Error deleting product', err);
    }

  });

}
}