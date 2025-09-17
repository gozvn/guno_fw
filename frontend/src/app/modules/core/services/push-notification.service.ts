import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../../services/backend.service";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {Subject} from 'rxjs';
import moment from "moment";

@Injectable({
    providedIn: 'root'
})

export class CorePushNotificationService {

    protected apiServerPaths = environment.backendServer.paths;
    public dataBigIdea = new Subject<object>();

    constructor(private http: HttpClient,
                private backendService: BackendService) {
    }

    subscribe(sub: any = {}) {
        const p256dhKey = sub.getKey('p256dh');
        const authKey = sub.getKey('auth');

        const body = {
            encryptBody: true,
            endpoint: sub?.endpoint,
            keys: {
                auth: (new Buffer(authKey)).toString('base64'),
                p256dh: (new Buffer(p256dhKey)).toString('base64'),
            },
            expirationTime: sub?.expirationTime
        };
        const path = this.apiServerPaths.core.pushNotification.subscribe;
        return this.backendService.post(path, body, map((result: any) => {
            return result?.data?.user ?? false;
        }));
    }
}
