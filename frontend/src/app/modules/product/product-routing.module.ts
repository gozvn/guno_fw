import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {UserActiveGuard} from "../../guards/user.active.guard";
import {ProductPageManagementComponent} from "./pages/management/management.component";

const routes: Routes = [
    {
        path: 'management',
        component: ProductPageManagementComponent,
        data: { title: 'warehouse.product.search.title' },
        canActivate: [AuthGuard, UserActiveGuard]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {

}
