import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-warehouse-page-delivery-partial-source-logo',
    templateUrl: './source-logo.component.html',
    styleUrl: './source-logo.component.scss'
})
export class WarehousePageDeliveryPartialSourceLogoComponent implements OnInit {

    @Input() element: any

    constructor() {
    }

    ngOnInit() {
    }
}
