import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../../services/backend.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductSkuService {

    protected apiServerPaths = environment.backendServer.paths;
    public dataBigIdea = new Subject<object>();

    constructor(private http: HttpClient,
                private backendService: BackendService) {
    }

    search(params: any) {
        const path = this.apiServerPaths.gunoHub.warehouse.sku.search;
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
                default:
                    options.params[key] = params[key];
            }
        }

        return this.backendService.get(path, options, map((result: any) => {
            return result.data;
        }));
    }

    export(params: any) {
        const path = this.apiServerPaths.gunoHub.warehouse.sku.export;
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
                default:
                    options.params[key] = params[key];
            }
        }

        return this.backendService.get(path, options, map((result: any) => {
            return result.data;
        }));
    }

    update(sellerSku: string, type: string, value: number) {
        switch (type) {
            case 'onHand':
                type = 'on-hand'
                break;
            case 'costPrice':
                type = 'cost-price'
                break;
        }

        const path = this.apiServerPaths.gunoHub.warehouse.sku.update.replace('{TYPE}', type);

        const body = {
            encryptBody: true,
            seller_sku: sellerSku,
            value: value
        }

        return this.backendService.post(path, body, map((result: any) => {
            return result.data;
        }));
    }
}
