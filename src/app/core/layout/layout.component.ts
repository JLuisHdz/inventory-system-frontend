import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LayoutDashboard, Package } from 'lucide-angular';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  animations: [

    trigger('routeAnimation', [

      transition('* <=> *', [

        style({ opacity: 0, transform: 'translateY(10px)' }),

        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )

      ])

    ])

  ]
})
export class LayoutComponent {
  readonly DashboardIcon = LayoutDashboard;
  readonly ProductsIcon = Package;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  logout(): void {

    this.authService.logout();
    this.router.navigate(['/login']);

  }

  username: string | null = null;

  prepareRoute(outlet: any) {
    return outlet?.activatedRouteData?.['animation'];
  }

}
