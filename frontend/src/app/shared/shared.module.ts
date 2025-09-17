import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedLoadingComponent} from "./components/loading/loading.component";
import {MaterialModule} from "./modules/material.module";
import {NgApexchartsModule} from "ng-apexcharts";
import { NgScrollbarModule } from 'ngx-scrollbar';
import {LazyLoadImageDirective} from "../directives/lazyload.image.directive";
import {PaginatorComponent} from "../modules/core/components/paginator/paginator.component";
import {TranslateModule} from "@ngx-translate/core";
import {HtmlSnackbarComponent} from "./components/html-snackbar/html-snackbar.component";
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
    declarations: [
        SharedLoadingComponent,
        LazyLoadImageDirective,
        PaginatorComponent,
        HtmlSnackbarComponent
    ],
    exports: [
        SharedLoadingComponent,
        LazyLoadImageDirective,
        NgScrollbarModule,
        PaginatorComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        NgApexchartsModule,
        NgScrollbarModule,
        TranslateModule,
        LightboxModule
    ], // các module cần thiết khác
})
export class SharedModule {}
