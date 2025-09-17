import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {UserActiveGuard} from "../../guards/user.active.guard";
import {ReportsPageOverviewRevenueComponent} from "./pages/overview/revenue/revenue.component";

const routes: Routes = [
    {
        path: 'overview/revenue',
        component: ReportsPageOverviewRevenueComponent,
        data: { title: 'reports.overview.title' },
        canActivate: [AuthGuard, UserActiveGuard]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule {

}
