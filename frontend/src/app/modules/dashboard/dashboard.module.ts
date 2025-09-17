import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {TablerIconsModule} from "angular-tabler-icons";
import {QuillModule} from 'ngx-quill'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardPageHomeComponent} from "./pages/home/home.component";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
    declarations: [
        DashboardPageHomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        MaterialModule,
        TranslateModule,
        TablerIconsModule,
        NgApexchartsModule,
        QuillModule.forRoot()
    ],
    exports: [],
    providers: [
        DecimalPipe
    ]
})
export class DashboardModule {
}
