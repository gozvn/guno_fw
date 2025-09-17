import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {OrderRoutingModule} from "./order-routing.module";
import {TablerIconsModule} from "angular-tabler-icons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgApexchartsModule} from "ng-apexcharts";
import {SharedModule} from "../../shared/shared.module";
import {SocketModule} from "../../shared/modules/socket/socket.module";
import {OrderPageManagementComponent} from "./pages/management/management.component";
import {OrderPartialSourceLogoComponent} from "./_partials/source-logo/source-logo.component";
import {OrderPartialStatusComponent} from "./_partials/status/status.component";
import {OrderPagePartialDetailComponent} from "./_partials/detail/detail.component";
import {
    OrderPartialVietnamPhoneCarrierComponent
} from "./_partials/vietnam-phone-carrier/vietnam-phone-carrier.component";

@NgModule({
    declarations: [
        OrderPageManagementComponent,
        // Partials
        OrderPagePartialDetailComponent,
        OrderPartialSourceLogoComponent,
        OrderPartialStatusComponent,
        OrderPartialVietnamPhoneCarrierComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OrderRoutingModule,
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
export class OrderModule {
}
