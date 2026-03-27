import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5;
  isLoading = false;
  searchTerm: string = '';
  searchControl = new FormControl('');
  hasResults = true;
  isAdmin = false;
  isManager = false;
  selectedFilter: string = 'all';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    console.log(this.products);
  console.log("Token:", localStorage.getItem("token"));
  console.log("ProductListComponent loaded");

  // Cargar roles al iniciar
  this.isAdmin = this.authService.isAdmin();
  this.isManager = this.authService.isManager();

  console.log("Roles:", this.authService.getUserRoles());

  // Cargar productos
  this.loadProducts();

  this.categoryService.getAll().subscribe({
  next: (res) => {
    console.log('CATEGORIES RESPONSE:', res);
    this.categories = res.data;
  },
  error: (err) => console.error(err)
});

  // Buscador
  this.searchControl.valueChanges
  .pipe(
    debounceTime(500),
    distinctUntilChanged()
  )
  .subscribe(value => {

    this.searchTerm = value ?? '';
    this.currentPage = 0;

    if (this.authService.isLoggedIn()) {
      this.loadProducts();
    }

  });

}

  loadProducts(): void {

  console.log("loadProducts ejecutándose");

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

getCategoryName(categoryId: number): string {

  const category = this.categories.find(c => c.id === categoryId);

  return category ? category.name : 'N/A';

}

setFilter(filter: string) {
  this.selectedFilter = filter;
}

get filteredProducts() {

  let filtered = this.products;

  if (this.selectedFilter === 'low') {
    filtered = filtered.filter(p => p.stock > 0 && p.stock <= 5);
  }

  if (this.selectedFilter === 'out') {
    filtered = filtered.filter(p => p.stock === 0);
  }

  if (this.sortColumn) {

    filtered = [...filtered].sort((a, b) => {

  let valueA = (a as any)[this.sortColumn];
  let valueB = (b as any)[this.sortColumn];

  // manejar fechas
  if (this.sortColumn === 'creationDate') {
    valueA = new Date(valueA).getTime();
    valueB = new Date(valueB).getTime();
  }

  // manejar texto
  if (typeof valueA === 'string' && typeof valueB === 'string') {
    valueA = valueA.toLowerCase();
    valueB = valueB.toLowerCase();
  }

  if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
  if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;

  return 0;

});


  }

  return filtered;

}

sort(column: string) {

  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

}
}