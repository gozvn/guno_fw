import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ProductRoutingModule} from "./product-routing.module";
import {TablerIconsModule} from "angular-tabler-icons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgApexchartsModule} from "ng-apexcharts";
import {SharedModule} from "../../shared/shared.module";
import {SocketModule} from "../../shared/modules/socket/socket.module";
import {ProductPageManagementComponent} from "./pages/management/management.component";

@NgModule({
    declarations: [
        ProductPageManagementComponent,
        // Partials
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductRoutingModule,
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
export class ProductModule {
}
