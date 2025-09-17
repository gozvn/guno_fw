import { InjectionToken } from '@angular/core';
import { SocketConfig } from './socket-config';

export const SOCKET_CONFIG = new InjectionToken<SocketConfig>('SOCKET_CONFIG');
