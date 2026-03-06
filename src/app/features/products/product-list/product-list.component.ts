import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5;
  isLoading = false;
  searchTerm: string = '';
  searchControl = new FormControl('');
  hasResults = true;
  

  constructor(private productService: ProductService) {}

  ngOnInit(): void {

  console.log("ProductListComponent loaded");

  this.loadProducts();

  this.searchControl.valueChanges
  .pipe(
    debounceTime(500),
    distinctUntilChanged()
  )
  .subscribe(value => {

    this.searchTerm = value ?? '';
    this.currentPage = 0;
    this.loadProducts();

  });

}

  loadProducts(): void {

  this.isLoading = true;

  this.productService
    .getAll(this.currentPage, this.pageSize, this.searchTerm)
    .subscribe({

      next: response => {

        this.products = response.data.content;
        this.totalPages = response.data.totalPages;

        this.hasResults = this.products.length > 0;

        this.isLoading = false;

      },

      error: err => {

        console.error(err);
        this.isLoading = false;

      }

    });

}

onSearch(): void {
  console.log("Search clicked:", this.searchTerm);
  this.currentPage = 0;
  this.loadProducts();
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

  Swal.fire({
    title: 'Delete product?',
    text: 'This action cannot be undone',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it'
  }).then((result) => {

    if (result.isConfirmed) {

      this.productService.delete(id).subscribe({

        next: () => {

          Swal.fire(
            'Deleted!',
            'Product has been deleted.',
            'success'
          );

          this.loadProducts();

        },

        error: () => {

          Swal.fire(
            'Error',
            'Could not delete product',
            'error'
          );

        }

      });

    }

  });

}
}