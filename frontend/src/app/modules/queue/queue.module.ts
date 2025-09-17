import {Injectable, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {QueueRoutingModule} from "./queue-routing.module";
import {TablerIconsModule} from "angular-tabler-icons";
import {QuillModule} from 'ngx-quill'
import {FormsModule} from "@angular/forms";
import {PipesModule} from "../../shared/modules/pipes.module";
import {QueuePageDashboardComponent} from "./pages/dashboard/dashboard.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {SharedModule} from "../../shared/shared.module";
import {QueuePageQueueComponent} from "./pages/queue/queue.component";
import {Highlight} from "ngx-highlightjs";
import {HighlightLineNumbers} from "ngx-highlightjs/line-numbers";

@NgModule({
    declarations: [
        QueuePageDashboardComponent,
        QueuePageQueueComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        QueueRoutingModule,
        MaterialModule,
        SharedModule,
        PipesModule,
        TranslateModule,
        TablerIconsModule,
        Highlight,
        HighlightLineNumbers,
        QuillModule.forRoot(),
        NgApexchartsModule
    ],
    exports: [],
    providers: []
})
export class QueueModule {
}
