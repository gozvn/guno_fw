import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {UserActiveGuard} from "../../guards/user.active.guard";
import {WarehousePageSkuManagementComponent} from "./pages/sku/management/management.component";
import {WarehousePageDeliveryManagementComponent} from "./pages/delivery/management/management.component";
import {WarehousePageReceiptManagementComponent} from "./pages/receipt/management/management.component";
import {WarehousePageStatsSkuComponent} from "./pages/stats/sku/sku.component";
import {WarehousePageStocktakingManagementComponent} from "./pages/stocktaking/management/management.component";
import {RoleWarehouseManagerGuard} from "../../guards/role.warehouse.manager.guard";
import {WarehousePageInventoryHistoryComponent} from "./pages/inventory/history/history.component";

const routes: Routes = [
    {
        path: 'sku/management',
        component: WarehousePageSkuManagementComponent,
        data: { title: 'dashboard.home.title' },
        canActivate: [AuthGuard, UserActiveGuard, RoleWarehouseManagerGuard]
    },
    {
        path: 'stocktaking/management',
        component: WarehousePageStocktakingManagementComponent,
        data: { title: 'dashboard.home.title' },
        canActivate: [AuthGuard, UserActiveGuard, RoleWarehouseManagerGuard]
    },
    {
        path: 'delivery/management',
        component: WarehousePageDeliveryManagementComponent,
        data: { title: 'dashboard.home.title' },
        canActivate: [AuthGuard, UserActiveGuard, RoleWarehouseManagerGuard]
    },
    {
        path: 'receipt/management',
        component: WarehousePageReceiptManagementComponent,
        data: { title: 'dashboard.home.title' },
        canActivate: [AuthGuard, UserActiveGuard, RoleWarehouseManagerGuard]
    },
    {
        path: 'stats/skus',
        component: WarehousePageStatsSkuComponent,
        data: { title: 'dashboard.home.title' },
        canActivate: [AuthGuard, UserActiveGuard, RoleWarehouseManagerGuard]
    },
    {
        path: 'inventory/history',
        component: WarehousePageInventoryHistoryComponent,
        data: { title: 'dashboard.home.title' },
        canActivate: [AuthGuard, UserActiveGuard, RoleWarehouseManagerGuard]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WarehouseRoutingModule {

}
