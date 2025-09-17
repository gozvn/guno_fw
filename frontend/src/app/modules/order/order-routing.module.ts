import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {UserActiveGuard} from "../../guards/user.active.guard";
import {OrderPageManagementComponent} from "./pages/management/management.component";

const routes: Routes = [
    {
        path: 'management',
        component: OrderPageManagementComponent,
        data: { title: 'dashboard.home.title' },
        canActivate: [AuthGuard, UserActiveGuard]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {

}
