import { ModuleWithProviders, NgModule } from '@angular/core';
import { SocketService } from './socket.service';
import { SOCKET_CONFIG } from './socket.tokens';
import { SocketConfig } from './socket-config';

@NgModule({})
export class SocketModule {
    static forRoot(config: SocketConfig): ModuleWithProviders<SocketModule> {
        return {
            ngModule: SocketModule,
            providers: [
                { provide: SOCKET_CONFIG, useValue: config },
                SocketService
            ]
        };
    }

    static forChild(): ModuleWithProviders<SocketModule> {
        return {
            ngModule: SocketModule,
            providers: [] // Không cung cấp lại service hay token
        };
    }
}
