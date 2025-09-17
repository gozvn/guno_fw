import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoleAdminGuard} from "../../guards/role.admin.guard";
import { AdminSystemUserComponent } from './pages/system/user/user.component';
import { AdminSystemRoleComponent } from './pages/system/role/role.component';
import { AdminSystemRouteComponent } from './pages/system/route/route.component';

const routes: Routes = [
    {
        path: 'system/manage-user',
        component: AdminSystemUserComponent,
        data: { title: 'admin.system.user.title'},
        canActivate: [RoleAdminGuard]
    },
    {
        path: 'system/manage-role',
        component: AdminSystemRoleComponent,
        data: { title: 'admin.system.role.title'},
        canActivate: [RoleAdminGuard]
    },
    {
        path: 'system/manage-route',
        component: AdminSystemRouteComponent,
        data: { title: 'admin.system.route.title'},
        canActivate: [RoleAdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}
