import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorNotFoundComponent} from "./pages/not-found/not-found.component";
import {ErrorRoutingModule} from "./error-routing.module";
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ErrorAccessDeniedComponent} from "./pages/access-denied/access-denied.component";

@NgModule({
    declarations: [
        ErrorNotFoundComponent,
        ErrorAccessDeniedComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateModule,
        ErrorRoutingModule
    ]
})
export class ErrorModule {
}
