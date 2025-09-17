import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {BackendResponseModel} from '../models/backend.response.model';
import {LocalStorageService} from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    protected apiServer = environment.backendServer;

    constructor(private httpClient: HttpClient,
                private localStorageService: LocalStorageService) {
    }

    getPaths() {
        this.apiServer = this.localStorageService.getSettings()?.apiConfigs || this.apiServer;
        return this.apiServer.paths;
    }

    _buildUrl(path: string) {
        let baseUrl = '';
        const hostname = this.apiServer.host || window.location.hostname;
        this.apiServer.host = hostname;
        if (this.apiServer.host) {
            baseUrl = this.apiServer.port === 443 || this.apiServer.ssl ? 'https://' : 'http://';
            baseUrl += this.apiServer.host;
            if (this.apiServer.port !== 80 && this.apiServer.port !== 443) {
                baseUrl += `:${this.apiServer.port}`;
            }
        }
        if (this.apiServer.prefix !== '') {
            baseUrl += this.apiServer.prefix;
        }
        return baseUrl + path;
    }

    get(path: string, options: {}, callback: any = null): Observable<any> {
        return this.httpClient.get<BackendResponseModel>(this._buildUrl(path), options)
            .pipe(callback || '');
    }

    post(path: string, options: any, callback: any = null, pipeline = true): Observable<any> {
        let body = typeof options.body !== 'undefined' ? options.body : null;
        body = body == null && typeof options.params !== 'undefined' ? options.params : options;
        const headers = typeof options.headers !== 'undefined' ? options.headers : {};
        const request = this.httpClient.post<BackendResponseModel>(this._buildUrl(path), body, headers);
        return pipeline ? request.pipe(callback || null) : request;
    }

    postFile(path: string, options: any, callback: any = null, pipeline = true): Observable<any> {
        let body = typeof options.body !== 'undefined' ? options.body : null;
        body = body == null && typeof options.params !== 'undefined' ? options.params : options;
        const headers = typeof options.headers !== 'undefined' ? options.headers : {};
        const request = this.httpClient.post(this._buildUrl(path), body, headers);
        return pipeline ? request.pipe(callback || null) : request;
    }

    delete(path: string, options: any, callback: any = null, pipeline = true): Observable<any> {
        let body = typeof options.body !== 'undefined' ? options.body : null;
        body = body == null && typeof options.params !== 'undefined' ? options.params : options;
        const headers = typeof options.headers !== 'undefined' ? options.headers : {};
        // @ts-ignore
        const request = this.httpClient.delete<BackendResponseModel>(this._buildUrl(path), body, headers);
        return pipeline ? request.pipe(callback || null) : request;
    }

    put(path: string, options: any, callback: any = null, pipeline = true): Observable<any> {
        const body = typeof options.body !== 'undefined' ? options.body : {};
        const headers = typeof options.headers !== 'undefined' ? options.headers : {};
        const request = this.httpClient.put<BackendResponseModel>(this._buildUrl(path), body, {
            headers,
            params: options.params || {}
        });
        return pipeline ? request.pipe(callback || null) : request;
    }
}
