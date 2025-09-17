import {NgModule} from '@angular/core';
import {DurationPipe} from "../../pipes/duration.pipe";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        DurationPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DurationPipe,
    ]
})
export class PipesModule {
}
