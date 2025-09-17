import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {UserActiveGuard} from "../../guards/user.active.guard";
import {DashboardPageHomeComponent} from "./pages/home/home.component";

const routes: Routes = [
    {
        path: '',
        component: DashboardPageHomeComponent,
        data: { title: 'dashboard.home.title' },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}
