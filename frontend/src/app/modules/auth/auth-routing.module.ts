import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthPageSideLoginComponent} from "./pages/side-login/side-login.component";
import {AuthPageActivateComponent} from "./pages/activate/activate.component";
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [
    {path: 'login', component: AuthPageSideLoginComponent, data: { title: 'auth.login.title' }},
    {path: 'activate', component: AuthPageActivateComponent, data: { title: 'auth.login.title' }, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}
