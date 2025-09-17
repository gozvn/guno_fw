import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {UserActiveGuard} from "../../guards/user.active.guard";
import {FinancePageDeptManagementComponent} from "./pages/dept/management/management.component";

const routes: Routes = [
    {
        path: 'dept',
        component: FinancePageDeptManagementComponent,
        data: { title: 'finance.dept.title' },
        canActivate: [AuthGuard, UserActiveGuard]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinanceRoutingModule {

}
