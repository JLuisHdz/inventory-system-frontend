import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
      private productService: ProductService,
    ) {}

  stats: any;

ngOnInit(): void {

  this.productService.getStats().subscribe({

    next: res => {
      console.log(res);
      this.stats = res.data;
    }

  });

}

}
