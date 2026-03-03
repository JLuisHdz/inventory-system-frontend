import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [

        {
            path: 'dashboard',
            component: DashboardComponent
        },

        {
            path: 'products',
            component: ProductListComponent
        }

    ]
    },

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
