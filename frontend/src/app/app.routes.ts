import { Routes } from '@angular/router';
import {MaintenanceLayoutDefaultComponent} from "./modules/maintenance/layouts/default/default.component";
import {LayoutBlankComponent} from "./modules/core/layouts/blank/blank.component";
import {LayoutAuthComponent} from "./modules/core/layouts/auth/auth.component";
import {AuthGuard} from "./guards/auth.guard";
import {RoleAdminGuard} from "./guards/role.admin.guard";
import {RoleSuperAdminGuard} from "./guards/role.super.admin.guard";
import {
    LayoutDefaultSidebarVerticalComponent
} from "./modules/core/layouts/default-sidebar-vertical/default-sidebar-vertical.component";
import {
    LayoutReportSidebarVerticalComponent
} from "./modules/core/layouts/report-sidebar-vertical/report-sidebar-vertical.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutBlankComponent,
        loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
    },
    {
        path: 'auth',
        component: LayoutAuthComponent,
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        component: LayoutDefaultSidebarVerticalComponent,
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard, RoleAdminGuard]
    },
    {
        path: 'order',
        component: LayoutDefaultSidebarVerticalComponent,
        loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
        canActivate: [AuthGuard, RoleAdminGuard]
    },
    {
        path: 'product',
        component: LayoutDefaultSidebarVerticalComponent,
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
        canActivate: [AuthGuard, RoleAdminGuard]
    },
    {
        path: 'warehouse',
        component: LayoutDefaultSidebarVerticalComponent,
        loadChildren: () => import('./modules/warehouse/warehouse.module').then(m => m.WarehouseModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'finance',
        component: LayoutDefaultSidebarVerticalComponent,
        loadChildren: () => import('./modules/finance/finance.module').then(m => m.FinanceModule),
        canActivate: [AuthGuard, RoleAdminGuard]
    },
    {
        path: 'reports',
        component: LayoutReportSidebarVerticalComponent,
        loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
        canActivate: [AuthGuard, RoleAdminGuard]
    },
    {
        path: 'queue',
        component: LayoutDefaultSidebarVerticalComponent,
        loadChildren: () => import('./modules/queue/queue.module').then(m => m.QueueModule),
        canActivate: [AuthGuard, RoleSuperAdminGuard]
    },
    {
        path: 'admin',
        component: LayoutDefaultSidebarVerticalComponent,
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard, RoleSuperAdminGuard]
    },
    {
        path: 'error',
        component: LayoutAuthComponent,
        loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
    },
    {
        path: 'maintenance',
        component: MaintenanceLayoutDefaultComponent,
        loadChildren: () => import('./modules/maintenance/maintenance.module').then(m => m.MaintenanceModule)
    },
    /**
     * Page 404
     */
    { path: '**', redirectTo: 'error/404-page-not-found' }
];
