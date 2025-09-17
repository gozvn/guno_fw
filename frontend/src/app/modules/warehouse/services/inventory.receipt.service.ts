import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../../services/backend.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class InventoryReceiptService {

    protected apiServerPaths = environment.backendServer.paths;
    public dataBigIdea = new Subject<object>();

    constructor(private http: HttpClient,
                private backendService: BackendService) {
    }

    create(data: any) {
        const path = this.apiServerPaths.gunoHub.warehouse.inventory.receipt.create;
        const body: any = data;
        body.encryptBody = true;

        return this.backendService.post(path, body, map((result: any) => {
            return result.data;
        }));
    }

    search(params: any) {
        const path = this.apiServerPaths.gunoHub.warehouse.inventory.receipt.search;
        const options: any = {
            params: {
                encryptParam: true
            },
            headers: {
                Accept: 'application/json'
            }
        };

        for (const key in params) {
            switch (key) {
                case 'seller-sku':
                    options.params.code = params[key];
                    break;
                default:
                    options.params[key] = params[key];
            }
        }

        return this.backendService.get(path, options, map((result: any) => {
            return result.data;
        }));
    }

    getByNumber(receiptNumber: number) {
        const path = this.apiServerPaths.gunoHub.warehouse.inventory.receipt.detail.replace('{NUMBER}', receiptNumber.toString());
        const options: any = {
            params: {
                encryptParam: true
            },
            headers: {
                Accept: 'application/json'
            }
        };

        return this.backendService.get(path, options, map((result: any) => {
            return result.data;
        }));
    }

    getItemByNumber(receiptNumber: number) {
        const path = this.apiServerPaths.gunoHub.warehouse.inventory.receipt.detail.replace('{NUMBER}', receiptNumber.toString());
        const options: any = {
            params: {
                encryptParam: true
            },
            headers: {
                Accept: 'application/json'
            }
        };

        return this.backendService.get(path, options, map((result: any) => {
            return result.data;
        }));
    }

    update(receiptNumber: number, data: any) {
        const path = this.apiServerPaths.gunoHub.warehouse.inventory.receipt.detail.replace('{NUMBER}', receiptNumber.toString());
        const body = {
            encryptBody: true,
            status: data.status,
            note: data.note,
            supplier_custom_id: data.supplierCustomId,
            expected_date: data.expectedDate,
            shipping_fee: data.shippingFee,
            discount: data.discount,
            vat: data.vat
        }
        return this.backendService.post(path, body, map((result: any) => {
            return result.data;
        }));
    }
}
