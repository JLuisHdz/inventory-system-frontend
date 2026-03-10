import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  constructor(
      private productService: ProductService,
    ) {}

  stats: any;
  chartData: any;

ngOnInit(): void {

  this.productService.getStats().subscribe({

    next: res => {

      this.stats = res.data;

      this.chartData = {
        labels: ['Total Products', 'Low Stock'],
        datasets: [
          {
            data: [
              this.stats.totalProducts,
              this.stats.lowStockProducts
            ]
          }
        ]
      };

    }

  });

}

}
