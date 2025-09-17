import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LandingPageHomeComponent} from "./pages/home/home.component";

const routes: Routes = [
    {path: '', component: LandingPageHomeComponent, data: { title: 'Home Page' }}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule {

}
