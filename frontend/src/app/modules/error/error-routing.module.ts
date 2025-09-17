import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorNotFoundComponent} from "./pages/not-found/not-found.component";
import {ErrorAccessDeniedComponent} from "./pages/access-denied/access-denied.component";

const routes: Routes = [
    {path: '404-page-not-found', component: ErrorNotFoundComponent, data: { title: 'error.404notFound.title' }},
    {path: '403-access-denied', component: ErrorAccessDeniedComponent, data: { title: 'error.403accessDenied.title' }},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorRoutingModule {

}
