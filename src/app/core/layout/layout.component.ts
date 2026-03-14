import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LayoutDashboard, Package } from 'lucide-angular';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  readonly DashboardIcon = LayoutDashboard;
  readonly ProductsIcon = Package;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {

    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
