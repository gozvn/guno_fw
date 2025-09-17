import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {FinanceRoutingModule} from "./finance-routing.module";
import {TablerIconsModule} from "angular-tabler-icons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgApexchartsModule} from "ng-apexcharts";
import {SharedModule} from "../../shared/shared.module";
import {SocketModule} from "../../shared/modules/socket/socket.module";
import {FinancePageDeptManagementComponent} from "./pages/dept/management/management.component";
import {FinancePageDeptPartialDetailComponent} from "./pages/dept/_partials/detail/detail.component";

@NgModule({
    declarations: [
        FinancePageDeptManagementComponent,
        FinancePageDeptPartialDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FinanceRoutingModule,
        MaterialModule,
        SharedModule,
        SocketModule.forChild(),
        TranslateModule,
        TablerIconsModule,
        NgApexchartsModule
    ],
    exports: [],
    providers: [
        DecimalPipe
    ]
})
export class FinanceModule {
}
