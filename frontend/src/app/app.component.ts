import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MaterialModule} from "./shared/modules/material.module";
import {environment} from "../environments/environment";
import {LocalStorageService} from "./services/local-storage.service";
import {EncryptService} from "./services/encrypt.service";
import {PushNotificationService} from "./services/push-notification.service";
import {AppState} from "./store/app.state";
import {Store} from "@ngrx/store";
import {SwUpdate} from '@angular/service-worker';
import {MatDialog} from "@angular/material/dialog";
import {
    DialogConfirmReloadNewVersionComponent
} from "./modules/core/components/dialogs/confirm-reload-new-version/confirm-reload-new-version.component";
import {SharedModule} from "./shared/shared.module";
import {SocketService} from "./shared/modules/socket/socket.service";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        TranslateModule,
        SharedModule,
        MaterialModule,
    ],
    providers: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = environment.appName;

    constructor(private store: Store<AppState>,
                private router: Router,
                private encryptService: EncryptService,
                private localStorageService: LocalStorageService,
                private pushNotificationService: PushNotificationService,
                private socketService: SocketService,
                private dialog: MatDialog,
                private swUpdate: SwUpdate) {
        if (environment.maintenanceMode) {
            this.router.navigate(['/maintenance']);
        }
    }

    ngOnInit() {
        const keys = this.localStorageService.getEncryptKeys();
        this.encryptService.genKeys(keys);
        if (keys == null) {
            this.localStorageService.setEncryptKeys({
                k: this.encryptService.clientPrivateKey,
                p: this.encryptService.clientPublicKey,
            })
        }

        // this.store.dispatch(autoLogin());
        this.pushNotificationService.subscribeToNotifications();
        if (this.swUpdate.isEnabled) {
            // Lắng nghe khi có bản cập nhật mới
            this.swUpdate.versionUpdates.subscribe(event => {
                console.log(event)
                if (event.type === 'VERSION_READY') {
                    // Khi có bản cập nhật mới
                    // console.log('Bản cập nhật mới đã sẵn sàng!');
                    // if (confirm('Có phiên bản mới, bạn có muốn tải lại để áp dụng không?')) {
                    //     this.swUpdate.activateUpdate().then(() => document.location.reload());
                    // }

                    this.dialog.open(DialogConfirmReloadNewVersionComponent, {
                        width: '350px',
                        enterAnimationDuration: '0ms',
                        exitAnimationDuration: '0ms',
                        data: {
                            callback: () => {
                                this.swUpdate.activateUpdate().then(() => document.location.reload());
                            }
                        }
                    });
                }
            });
        }
    }


    // Được gọi khi người dùng nhấp vào nút
    subscribeToPush() {
        this.pushNotificationService.subscribeToNotifications();
    }

    translate: TranslateService = inject(TranslateService);

    translateText(lang: string) {
        this.translate.use(lang);
    }
}
