export interface SocketConfig {
    mode: string,
    url: string;
    options?: any; // ví dụ: { transports: ['websocket'], auth: { token: '...' } }
}
