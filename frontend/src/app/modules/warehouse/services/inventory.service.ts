import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../../services/backend.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class InventoryService {

    protected apiServerPaths = environment.backendServer.paths;
    public dataBigIdea = new Subject<object>();

    constructor(private http: HttpClient,
                private backendService: BackendService) {
    }

    search(filters: any) {
        const path = this.apiServerPaths.gunoHub.warehouse.inventory.search;
        const body: any = filters;
        body.encryptBody = true;

        return this.backendService.post(path, body, map((result: any) => {
            return result.data;
        }));
    }
}
