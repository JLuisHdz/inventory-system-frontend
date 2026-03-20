import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoryId: [null, Validators.required] 
  });

isEditMode = false;
productId!: number;
isSubmitting = false;
categories: any[] = [];

constructor(
  private fb: FormBuilder,
  private productService: ProductService,
  private categoryService: CategoryService,
  private router: Router,
  private route: ActivatedRoute
) {}

  onSubmit(): void {

  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;   // 👈 AQUI se activa el loading

  const request = this.productForm.value;
  console.log('REQUEST:', request);

  if (this.isEditMode) {

    this.productService.update(this.productId, request)
      .subscribe({

        next: () => {
          this.isSubmitting = false;   // 👈 se desactiva
          this.router.navigate(['/products']);
        },

        error: err => {
          console.error(err);
          this.isSubmitting = false;   // 👈 se desactiva si falla
        }

      });

  } else {

    this.productService.create(request)
      .subscribe({

        next: () => {
          this.isSubmitting = false;   // 👈 se desactiva
          this.router.navigate(['/products']);
        },

        error: err => {
          console.error(err);
          this.isSubmitting = false;   // 👈 se desactiva si falla
        }

      });

  }

}

  ngOnInit(): void {

  this.productId = Number(this.route.snapshot.paramMap.get('id'));

  if (this.productId) {

    this.isEditMode = true;
    this.loadProduct();

  }
  
  this.categoryService.getAll().subscribe({
    next: (res) => {
      this.categories = res.data; // depende de tu ApiResponse
    },
    error: (err) => console.error(err)
  });

}


loadProduct(): void {

  this.productService.getById(this.productId)
    .subscribe(response => {

      const product = response.data;

      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock
      });

    });

}

}
