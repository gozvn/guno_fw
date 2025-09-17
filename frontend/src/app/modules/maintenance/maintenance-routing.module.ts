import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MaintenanceHomeComponent} from "./pages/home/home.component";

const routes: Routes = [
    {path: '', component: MaintenanceHomeComponent, data: { title: 'maintenance.title' }}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule {

}
