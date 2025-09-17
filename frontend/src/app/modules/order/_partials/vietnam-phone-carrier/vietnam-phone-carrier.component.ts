import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-order-partial-vietnam-phone-carrier',
    templateUrl: './vietnam-phone-carrier.component.html',
    styleUrl: './vietnam-phone-carrier.component.scss'
})
export class OrderPartialVietnamPhoneCarrierComponent implements OnInit {

    @Input() phoneNumber: any

    carrierName: any = '';

    constructor() {
    }

    ngOnInit() {
        this.carrierName = this.getCarrierName();
    }

    getCarrierName() {
        if (!this.phoneNumber) {
            return null;
        }
        // Bỏ ký tự không phải số, trừ dấu * (để giữ vị trí masking)
        const cleaned = this.phoneNumber.replace(/[^0-9*]/g, '');

        // Tìm phần prefix trước khi gặp '*'
        const numericPrefix = cleaned.replace(/^840/, '0').replace(/^84/, '0').substring(0, 4);

        // Nếu không đủ 4 ký tự (0XYZ) → không xác định được
        if (numericPrefix.length < 3) {
            return null;
        }

        // Lấy 3 số đầu sau số 0
        const prefix = numericPrefix.substring(0, 3);

        const carriers = {
            mobifone: ['070', '079', '077', '076', '078', '089', '090', '093'],
            vinaphone: ['091', '094', '088', '083', '084', '085', '081', '082'],
            viettel: ['086', '096', '097', '098', '039', '038', '037', '036', '035', '034', '033', '032'],
            vietnamobile: ['092', '052', '056', '058'],
            gmobile: ['099', '059'],
            itelecom: ['087']
        };

        for (const [carrier, prefixes] of Object.entries(carriers)) {
            if (prefixes.includes(prefix)) {
                return carrier;
            }
        }

        return null;
    }

}
