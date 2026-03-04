import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  isEditMode = false;
productId!: number;

constructor(
  private fb: FormBuilder,
  private productService: ProductService,
  private router: Router,
  private route: ActivatedRoute
) {}

  onSubmit(): void {

  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  const request = this.productForm.value;

  if (this.isEditMode) {

    this.productService.update(this.productId, request)
      .subscribe(() => this.router.navigate(['/products']));

  } else {

    this.productService.create(request)
      .subscribe(() => this.router.navigate(['/products']));

  }

}

  ngOnInit(): void {

  this.productId = Number(this.route.snapshot.paramMap.get('id'));

  if (this.productId) {

    this.isEditMode = true;
    this.loadProduct();

  }

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
