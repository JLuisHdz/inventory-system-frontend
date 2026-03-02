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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {

  console.log("ProductListComponent loaded");

  this.loadProducts();

}

  loadProducts(): void {

  this.productService.getAll().subscribe({

    next: response => {

      this.products = response.data.content;

    },

    error: err => {

      console.error('Error loading products', err);

    }

  });

}
}