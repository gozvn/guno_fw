import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../../services/backend.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {Subject} from 'rxjs';
import {FinanceDept} from "../models/dept.model";

@Injectable({
    providedIn: 'root'
})

export class FinanceDeptService {

    protected apiServerPaths = environment.backendServer.paths;
    public dataBigIdea = new Subject<object>();

    constructor(private http: HttpClient,
                private backendService: BackendService) {
    }

    private _getModel(item: any) {
        const model = new FinanceDept(item);
        return model;
    }

    search(params: any) {
        const path = this.apiServerPaths.gunoHub.finance.dept.search;
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

    getItemByNumber(deptNumber: any) {
        const path = this.apiServerPaths.gunoHub.finance.dept.detail.replace('{NUMBER}', deptNumber.toString());
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

    update(dept: any, data: any) {
        const path = this.apiServerPaths.gunoHub.finance.dept.detail.replace('{NUMBER}', dept.number.toString());
        const options: any = {
            params: {
                encryptBody: true,
                skus: data.skus,
                status: data.status,
                description: data.description
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
