import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-warehouse-page-receipt-partial-source-logo',
    templateUrl: './source-logo.component.html',
    styleUrl: './source-logo.component.scss'
})
export class WarehousePageReceiptPartialSourceLogoComponent implements OnInit {

    @Input() element: any

    constructor() {
    }

    ngOnInit() {
    }
}
