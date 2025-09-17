import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {EncryptService} from "./encrypt.service";
import * as forge from 'node-forge';
import {AppCookieService} from "./app-cookie.service";

@Injectable({providedIn: 'root'})
export class LocalStorageService {

    protected prefix = environment.appPrefix;

    protected locale = 'vi';

    protected userKey = 'current_user';

    protected settingsKey = 'app_settings';

    protected encryptKey = 'keys';

    constructor(private encryptService: EncryptService,
                private appCookieService: AppCookieService) { }

    public getKeyName(key: string) {
        return `${this.prefix}${key}`;
    }

    public setLang(lang:any){
        localStorage.setItem(this.getKeyName('lang'), lang);
    }

    public get(key: string): any {
        return localStorage.getItem(this.getKeyName(key));
    }

    public getItem(key: string): any {
        const data = localStorage.getItem(this.getKeyName(key));
        return data ? JSON.parse(data) : null;
    }

    public delete(key: string) {
        return localStorage.removeItem(this.getKeyName(key));
    }

    public clear() {
        this.appCookieService.clear();
        return localStorage.clear();
    }

    public getLocale() {
        let  locale = this.get('lang');
        locale = locale ? locale : environment.language.default;
        this.setLocale(locale);
        this.locale = locale;
        return this.locale;
    }

    public setLocale(locale: string) {
        localStorage.setItem(this.getKeyName('lang'), locale);
    }

    public getCurrentUser() {
        const currentUser = this.get(this.userKey);
        const accessToken = this.appCookieService.getAuth();
        let user = null;
        if (currentUser && accessToken) {
            user = JSON.parse(currentUser);
            user.accessToken = accessToken;
        }
        return user;
    }

    public setUser(user: User) {
        this.appCookieService.setAuth(user.accessToken, user.refreshToken, Math.floor(user.expirationIn / (24 * 60 * 60)));
        // @ts-ignore
        delete user.accessToken;
        // @ts-ignore
        delete user.refreshToken;
        return localStorage.setItem(this.getKeyName(this.userKey), JSON.stringify(user));
    }
    public setItem(data:any, key:any) {
        return localStorage.setItem(this.getKeyName(key), JSON.stringify(data));
    }

    public removeUser() {
        return localStorage.removeItem(this.getKeyName(this.userKey));
    }

    setEncryptKeys(keys: any) {
        return localStorage.setItem(this.getKeyName(this.encryptKey), btoa(JSON.stringify(keys)));
    }

    getEncryptKeys() {
        const keys = localStorage.getItem(this.getKeyName(this.encryptKey));
        return keys ? JSON.parse(atob(keys)) : null;
    }

    setSettings(data: any) {
        if (environment.rsa.isActive) {
            const privateKey = forge.util.decode64(data.p);
            this.encryptService.clientPrivateKey = privateKey;
            const decryptData = JSON.parse(this.encryptService.decryptResponse(data));
            const dataUser = decryptData?.user;
            const user = this.getCurrentUser();
            if (dataUser && user) {
                user.email = dataUser.email;
                user.fullName = dataUser.fullName;
                user.userId = dataUser.userId;
                user.roleId = dataUser.roleId;
                user.departmentId = dataUser.departmentId;
                user.canChangePassword = dataUser.canChangePassword;
                localStorage.setItem(this.getKeyName(this.userKey), JSON.stringify(user));
            }
        }
        return localStorage.setItem(this.getKeyName(this.settingsKey), JSON.stringify(data));
    }

    getSettings() {
        const dataEncrypt = localStorage.getItem(this.getKeyName(this.settingsKey));
        const data = dataEncrypt ? JSON.parse(dataEncrypt) : null;
        if (!data) return null;

        if (environment.rsa.isActive) {
            const privateKey = forge.util.decode64(data.p);
            this.encryptService.clientPrivateKey = privateKey;
            return data ? JSON.parse(this.encryptService.decryptResponse(data)) : false;
        }
        return data;
    }

    public remove(key:any){
        return localStorage.removeItem(this.getKeyName(key));
    }
}
