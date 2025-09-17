import {Component, Inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TablerIconsModule} from "angular-tabler-icons";
import {MaterialModule} from "../../../../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-dialog-confirm-action',
    templateUrl: './confirm-action.component.html',
    styleUrl: './confirm-action.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule, TablerIconsModule, MaterialModule,
        TranslateModule
    ]
})
export class DialogConfirmActionComponent {

    constructor(@Inject(MAT_DIALOG_DATA)
                public data: any,
                private dialogRef: MatDialogRef<DialogConfirmActionComponent>
    ) {

    }

    confirm() {
        if (this.data && typeof this.data.callback === 'function') {
            this.data.callback();
        }
    }
}
