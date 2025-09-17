import { Inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { SOCKET_CONFIG } from './socket.tokens';
import { SocketConfig } from './socket-config';
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../../services/authentication.service";
import moment from 'moment-timezone';
import {HtmlSnackbarComponent} from "../../components/html-snackbar/html-snackbar.component";
import {TabVisibilityService} from "../../../services/tab-visibility.service";

@Injectable()
export class SocketService {
    private socket: Socket;

    constructor(@Inject(SOCKET_CONFIG) private config: SocketConfig,
                private snackBar: MatSnackBar,
                private tabVisibilityService: TabVisibilityService,
                private authenticationService: AuthenticationService) {
        // Theo dõi khi tab active/inactive
        this.tabVisibilityService.isTabActive$.subscribe((isActive) => {
            if (isActive) {
                console.log('[SocketService] Tab active -> reconnecting at...', (new Date).toString());
                this._initSocket();
            } else {
                console.log('[SocketService] Tab inactive -> disconnecting at...', (new Date).toString());
                this.disconnect();
            }
        });
    }

    private _initSocket() {
        if (this.socket && this.socket.connected) {
            return; // đã kết nối rồi, không cần khởi tạo lại
        }

        const user = this.authenticationService.currentUserValue;
        this.config.mode = environment.socket.mode;
        this.config.options = {
            ...(this.config.options || {}),
            path: environment.socket.path,
            auth: {
                token: 'Bearer ' + (user?.accessToken ?? ''),
            }
        };

        this.socket = io(this.config.url, this.config.options);

        this.socket.on('connect', () => {
            console.log('[SocketService] Connected! socket.id =', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            console.log('[SocketService] Disconnected!');
        });

        // Đăng ký các sự kiện cần lắng nghe
        this._registerEvents();
    }

    private _registerEvents() {
        const user = this.authenticationService.currentUserValue;
        if (user && user.userId === 1) {
            this.on<any>('shopping:order:new').subscribe((order) => {
                if (!this.tabVisibilityService.isTabActive) {
                    // 👉 Tab không active, không render gì cả
                    return;
                }

                let type = 'mới',
                    source = order?.order_sources_name ?? '';
                switch (order.status) {
                    case 0:
                    case 1:
                    case 8:
                    case 9:
                    case 11:
                    case 12:
                    case 13:
                        break;
                    case 15:
                        type = 'đã hoàn 1 phần';
                        break;
                    case 2:
                        type = 'đang vận chuyển';
                        break;
                    case 4:
                        type = 'đang hoàn trả';
                        break;
                    case 5:
                        type = 'đã hoàn trả';
                        break;
                    case 3:
                        type = 'đã nhận';
                        break;
                    case 6:
                        type = 'đã hủy';
                        break;
                }
                const title = `[GUNO MATE] 📦 Đơn hàng ${type} #${order.id}`;
                const insertedDate = moment.utc(order.inserted_at).tz('Asia/Ho_Chi_Minh').format('HH:mm, DD/MM/YYYY');
                const updatedDate = moment.utc(order.updated_at).tz('Asia/Ho_Chi_Minh').format('HH:mm, DD/MM/YYYY');

                this._openSnackBar(`<div class="snackbar-title">${title}</div><div><ul class="list-group list-group-flush m-t-4 m-b-0 p-l-15"><li class="list-group-item f-s-14">Nguồn: ${source ? source : 'N/A'}</li><li class="list-group-item f-s-14">Ngày tạo: ${insertedDate}</li><li class="list-group-item f-s-14">Ngày cập nhật: ${updatedDate}</li></ul></div>`, 'Xem chi tiết');
                this._showBrowserNotification(title, `• Order Id ${order.id} • Nguồn ${source ? source : 'N/A'} • Ngày tạo: ${insertedDate} • Ngày cập nhật: ${updatedDate}`, './assets/styles/default/images/guno-mate-logo.jpg');
            });
        }
    }


    private _showBrowserNotification(title: string, body: string, icon?: string) {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: icon || '/assets/icon.png'
            });
        }
    }

    private _openSnackBar(message: string, action: string) {
        this.snackBar.openFromComponent(HtmlSnackbarComponent, {
            data: message,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 4 * 1000,
            panelClass: ['snackbar-success', 'html-snackbar'],
        })
    }

    emit(event: string, data: any) {
        this.socket.emit(event, data);
    }

    on<T>(event: string): Observable<T> {
        return new Observable<T>((observer) => {
            const handler = (data: T) => observer.next(data);
            this.socket.on(event, handler);

            return () => this.socket.off(event, handler); // Hủy khi unsubscribe
        });
    }

    disconnect() {
        if (this.socket && this.socket.connected) {
            this.socket.disconnect();
            this.socket = null as any; // reset socket instance
        }
    }
}
