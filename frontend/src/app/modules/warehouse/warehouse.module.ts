import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {WarehouseRoutingModule} from "./warehouse-routing.module";
import {TablerIconsModule} from "angular-tabler-icons";
import {QuillModule} from 'ngx-quill'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgApexchartsModule} from "ng-apexcharts";
import {WarehousePageSkuManagementComponent} from "./pages/sku/management/management.component";
import {SharedModule} from "../../shared/shared.module";
import {WarehousePageDeliveryManagementComponent} from "./pages/delivery/management/management.component";
import {SocketModule} from "../../shared/modules/socket/socket.module";
import {WarehousePageReceiptManagementComponent} from "./pages/receipt/management/management.component";
import {WarehousePageReceiptPartialCreateComponent} from "./pages/receipt/_partials/create/create.component";
import {WarehousePageReceiptPartialDetailComponent} from "./pages/receipt/_partials/detail/detail.component";
import {WarehousePageDeliveryPartialDetailComponent} from "./pages/delivery/_partials/detail/detail.component";
import {WarehousePageDeliveryPartialCreateComponent} from "./pages/delivery/_partials/create/create.component";
import {
    WarehousePageDeliveryPartialSourceLogoComponent
} from "./pages/delivery/_partials/source-logo/source-logo.component";
import {WarehousePageStatsSkuComponent} from "./pages/stats/sku/sku.component";
import {
    WarehousePageReceiptPartialSourceLogoComponent
} from "./pages/receipt/_partials/source-logo/source-logo.component";
import {WarehousePageStocktakingManagementComponent} from "./pages/stocktaking/management/management.component";
import {WarehousePageStocktakingPartialDetailComponent} from "./pages/stocktaking/_partials/detail/detail.component";
import {WarehousePageStocktakingPartialCreateComponent} from "./pages/stocktaking/_partials/create/create.component";
import {WarehouseSkuSelectComponent} from "./components/sku-select/sku-select.component";
import {WarehousePageInventoryHistoryComponent} from "./pages/inventory/history/history.component";

@NgModule({
    declarations: [
        // components
        WarehouseSkuSelectComponent,
        WarehousePageSkuManagementComponent,
        // Stocktaking
        WarehousePageStocktakingManagementComponent,
        // Stocktaking Partials
        WarehousePageStocktakingPartialCreateComponent,
        WarehousePageStocktakingPartialDetailComponent,
        // Delivery
        WarehousePageDeliveryManagementComponent,
        // Delivery Partials
        WarehousePageDeliveryPartialCreateComponent,
        WarehousePageDeliveryPartialDetailComponent,
        WarehousePageDeliveryPartialSourceLogoComponent,
        // Receipt
        WarehousePageReceiptManagementComponent,
        // Receipt Partials
        WarehousePageReceiptPartialCreateComponent,
        WarehousePageReceiptPartialDetailComponent,
        WarehousePageReceiptPartialSourceLogoComponent,
        // Stats
        WarehousePageStatsSkuComponent,
        // Inventory
        WarehousePageInventoryHistoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WarehouseRoutingModule,
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
export class WarehouseModule {
}
