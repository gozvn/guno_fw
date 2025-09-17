import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {TablerIconsModule} from "angular-tabler-icons";
import {QuillModule} from 'ngx-quill'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgApexchartsModule} from "ng-apexcharts";
import {SharedModule} from "../../shared/shared.module";
import {SocketModule} from "../../shared/modules/socket/socket.module";
import {ReportsRoutingModule} from "./reports-routing.module";
import {ReportsPageOverviewRevenueComponent} from "./pages/overview/revenue/revenue.component";

@NgModule({
    declarations: [
        ReportsPageOverviewRevenueComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ReportsRoutingModule,
        MaterialModule,
        SharedModule,
        SocketModule.forChild(),
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
export class ReportsModule {
}
