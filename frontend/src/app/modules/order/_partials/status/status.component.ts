import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-order-partial-status',
    templateUrl: './status.component.html',
    styleUrl: './status.component.scss'
})
export class OrderPartialStatusComponent implements OnInit {

    @Input() element: any

    constructor() {
    }

    ngOnInit() {
    }
}
