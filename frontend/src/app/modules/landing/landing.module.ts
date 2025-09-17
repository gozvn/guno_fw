import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingRoutingModule} from "./landing-routing.module";
import {LandingPageHomeComponent} from "./pages/home/home.component";
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {TablerIconsModule} from "angular-tabler-icons";
import {SharedModule} from "../../shared/shared.module";
import {
    AppHorizontalHeaderComponent
} from "../core/layouts/_partials/app-horizontal-header/app-horizontal-header.component";

@NgModule({
    declarations: [
        LandingPageHomeComponent,
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        MaterialModule,
        TranslateModule,
        TablerIconsModule,
        AppHorizontalHeaderComponent
    ],
    exports: [
        LandingPageHomeComponent, // export cho các modules khác sử dụng
    ],
    providers: []
})
export class LandingModule {
}
