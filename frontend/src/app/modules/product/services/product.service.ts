import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../../services/backend.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {Subject} from 'rxjs';
import {Product} from "../models/product.model";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    protected apiServerPaths = environment.backendServer.paths;
    public dataBigIdea = new Subject<object>();

    constructor(private http: HttpClient,
                private backendService: BackendService) {
    }

    private _getModel(item: any) {
        const model = new Product(item);
        return model;
    }

    getById(orderId: any) {
        const path = this.apiServerPaths.gunoHub.order.detail.replace('{ORDER_ID}', orderId.toString());
        const options: any = {
            params: {
                encryptParam: true
            },
            headers: {
                Accept: 'application/json'
            }
        };

        return this.backendService.get(path, options, map((result: any) => {
            const data = result.data;
            const order = data?.order ?? false;
            return order ? this._getModel(order) : false;
        }));
    }

    search(params: any) {
        const path = this.apiServerPaths.gunoHub.product.search;
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
            console.log(result)
            const data = result.data;
            const products = data?.products ?? [];
            data.products = [];
            for (const i in products) {
                data.products.push(this._getModel(products[i]));
            }

            result.data = data;
            return result.data;
        }));
    }

    updateCostPrice(sellerProduct: any, data: any) {
        const path = this.apiServerPaths.gunoHub.product.update.replace('{TYPE}', 'cost-price');
        const options: any = {
            params: {
                encryptBody: true,
                seller_product: sellerProduct,
                value: data,
            },
            headers: {
                Accept: 'application/json'
            }
        };

        return this.backendService.post(path, options, map((result: any) => {
            return result.data;
        }));
    }
}
