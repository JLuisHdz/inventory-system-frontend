import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductListComponent } from './features/products/product-list/product-list.component';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },

    {

        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },

    {
        path: 'products',
        component: ProductListComponent,
        canActivate: [authGuard]
    },

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
