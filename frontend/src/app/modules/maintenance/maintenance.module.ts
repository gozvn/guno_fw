import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaintenanceHomeComponent} from "./pages/home/home.component";
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {MaintenanceRoutingModule} from "./maintenance-routing.module";
import {MaintenanceLayoutDefaultComponent} from "./layouts/default/default.component";

@NgModule({
    declarations: [
        MaintenanceLayoutDefaultComponent,
        MaintenanceHomeComponent
    ],
    imports: [
        CommonModule,
        MaintenanceRoutingModule,
        MaterialModule,
        TranslateModule
    ],
    exports: [
        MaintenanceHomeComponent, // export cho các modules khác sử dụng
    ],
    providers: []
})
export class MaintenanceModule {
}
