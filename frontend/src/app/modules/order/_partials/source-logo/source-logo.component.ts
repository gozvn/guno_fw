import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-order-partial-source-logo',
    templateUrl: './source-logo.component.html',
    styleUrl: './source-logo.component.scss'
})
export class OrderPartialSourceLogoComponent implements OnInit {

    @Input() element: any
    @Input() click: any
    @Output() clickDetail = new EventEmitter<any>();

    constructor(private clipboard: Clipboard,
                private snackBar: MatSnackBar,
                private translateService: TranslateService,) {
    }

    ngOnInit() {
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 4 * 1000,
        });
    }

    openDetail() {
        this.clickDetail.emit(this.element);
    }

    copy(content: string) {
        this.clipboard.copy(content);
        this.openSnackBar(this.translateService.instant('labels.copySuccess') + ` ${content}`, '');
    }
}
