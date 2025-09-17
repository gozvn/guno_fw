import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../../services/backend.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {Subject} from 'rxjs';
import {Order} from "../models/order.model";

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    protected apiServerPaths = environment.backendServer.paths;
    public dataBigIdea = new Subject<object>();

    constructor(private http: HttpClient,
                private backendService: BackendService) {
    }

    private _getModel(item: any) {
        const model = new Order(item);
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
        const path = this.apiServerPaths.gunoHub.order.search;
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
            const data = result.data;
            const orders = data?.orders ?? [];
            data.orders = [];
            for (const i in orders) {
                data.orders.push(this._getModel(orders[i]));
            }

            result.data = data;
            return result.data;
        }));
    }
}
