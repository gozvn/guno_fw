import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
    selector: 'app-html-snackbar',
    styleUrl: './html-snackbar.component.scss',
    // template: `<div [innerHTML]="data"></div>`,
    templateUrl: './html-snackbar.component.html',
})
export class HtmlSnackbarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}
