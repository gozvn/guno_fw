import {Component, Inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TablerIconsModule} from "angular-tabler-icons";
import {MaterialModule} from "../../../../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-dialog-confirm-reload-new-version',
    templateUrl: './confirm-reload-new-version.component.html',
    styleUrl: './confirm-reload-new-version.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule, TablerIconsModule, MaterialModule,
        TranslateModule
    ]
})
export class DialogConfirmReloadNewVersionComponent {

    constructor(@Inject(MAT_DIALOG_DATA)
                public data: any,
                private dialogRef: MatDialogRef<DialogConfirmReloadNewVersionComponent>
    ) {
        this.dialogRef.disableClose = true;
    }

    reload() {
        if (this.data && typeof this.data.callback === 'function') {
            this.data.callback();
        }
    }
}
