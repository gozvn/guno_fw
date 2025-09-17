import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {CorePushNotificationService} from "../modules/core/services/push-notification.service";
import {AppCookieService} from "./app-cookie.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class PushNotificationService {

    readonly VAPID_PUBLIC_KEY = environment.vapid.publicKey;

    constructor(
        private swPush: SwPush,
        private http: HttpClient,
        private corePushNotificationService: CorePushNotificationService,
        private appCookieService: AppCookieService,
        private authenticationService: AuthenticationService
    ) {}

    subscribeToNotifications() {
        if (!this.swPush.isEnabled || !this.authenticationService.getUserFromLocalStorage()) {
            // console.log('Push notifications are not enabled');
            // return;
        }

        // Kiểm tra trạng thái đăng ký hiện tại
        this.swPush.subscription.subscribe(subscription => {
            if (subscription !== null) {
                return;
            }

            this.swPush.requestSubscription({
                serverPublicKey: this.VAPID_PUBLIC_KEY
            })
                .then(sub => {
                    // Gửi subscription lên server để lưu trữ
                    this.corePushNotificationService.subscribe(sub).subscribe((result: any) => {
                        if (!result) {
                            return;
                        }
                        this.appCookieService.setNotyDeviceId(result.id);
                    });
                })
                .catch(err => console.error('Could not subscribe to notifications', err));
        });
    }
}
