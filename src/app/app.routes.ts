import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { LayoutComponent } from './core/layout/layout.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';

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
            path: 'products/create',
            component: ProductFormComponent
        },
        
        {
            path: 'products/edit/:id',
            component: ProductFormComponent
        },

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
