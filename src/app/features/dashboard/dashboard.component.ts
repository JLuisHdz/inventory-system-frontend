import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js/auto';

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
  chart: any;

  products: any[] = [];

  lowStockProducts: any[] = [];
  outOfStockProducts: any[] = [];

  ngOnInit(): void {

    // 🔹 Stats (lo que ya tienes)
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

    // 🔥 NUEVO: traer productos para alerts
    this.loadProducts();

  }

  loadProducts(): void {

    this.productService.getAll(0, 100).subscribe({

      next: res => {

      
        this.products = res.data.content;
        this.createCategoryChart();

        // 🔴 Out of stock
        this.outOfStockProducts = this.products.filter(
          (p: any) => p.stock === 0
        );

        // 🟡 Low stock
        this.lowStockProducts = this.products.filter(
          (p: any) => p.stock > 0 && p.stock <= 5
        );

      }

    });

  }

  createCategoryChart(): void {

  const categoryMap: any = {};

  this.products.forEach((p: any) => {
    const category = p.category?.name || 'No Category';

    if (!categoryMap[category]) {
      categoryMap[category] = 0;
    }

    categoryMap[category]++;
  });

  const labels = Object.keys(categoryMap);
  const data = Object.values(categoryMap);

  if (this.chart) {
    this.chart.destroy();
  }

  this.chart = new Chart('categoryChart', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Products per Category',
        data: data
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

}

}
