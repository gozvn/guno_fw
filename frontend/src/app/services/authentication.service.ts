import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LocalStorageService } from "./local-storage.service";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { AuthResponseData } from '../models/auth.response.data.model';
import { User } from '../models/user.model';
import { BackendService } from "./backend.service";
import {logout} from "../modules/auth/store/auth.actions";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public key = 'current_user';
    private originalUserKey = 'user_original';
    protected apiServerPaths = environment.backendServer.paths;

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    timeoutInterval: any;
    private originalUserSubject: BehaviorSubject<any>;
    public originalUser: Observable<User>;

    private socialUserSubject = new BehaviorSubject<SocialUser | null>(null);

    constructor(private http: HttpClient,
                private socialAuthService: SocialAuthService,
                private backendService: BackendService,
                private store: Store<AppState>,
                private localStorageService: LocalStorageService) {
        // @ts-ignore
        this.currentUserSubject = new BehaviorSubject<any>(this.localStorageService.getCurrentUser());
        this.currentUser = this.currentUserSubject.asObservable();
        this.originalUserSubject = new BehaviorSubject<any>(this.getUserOriginalFromLocalStorage() || null);
        this.originalUser = this.originalUserSubject.asObservable();

        this.socialAuthService.authState.subscribe((user) => {
            this.socialUserSubject.next(user);
        });
    }

    get currentSocialUser(): Observable<SocialUser | null> {
        return this.socialUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public get originalUserValue(): User {
        return this.originalUserSubject.value;
    }

    login(email: string, password: string, encryptBody = false) {
        const verifyClient = true;
        return this.backendService.post(this.apiServerPaths.auth.login, {
            email,
            password,
            encryptBody,
            verifyClient
        }, null, false);
    }

    logout() {
        this.socialAuthService.signOut().then(() => {
            this.socialUserSubject.next(null);
        });

        this.localStorageService.clear();
        return this.currentUserSubject.next(null);
        if (this.timeoutInterval) {
            clearTimeout(this.timeoutInterval);
            this.timeoutInterval = null;
        }
    }

    socialLogin(socialName: string) {
        const options: any = {
            params: {},
            headers: {
                Accept: 'application/json',
            }
        };
        let path = this.apiServerPaths.auth.social.request;
        path = path.replace('{SOCIAL_NAME}', socialName);
        return this.backendService._buildUrl(path);
    }

    socialCallback(socialName: string, params: any) {
        const options: any = {
            params: {
                encryptParam: true
            },
            headers: {
                Accept: 'application/json'
            }
        };
        for (const i in params) {
            options.params[i] = decodeURIComponent(params[i]);
        }
        let path = this.apiServerPaths.auth.social.callback;
        path = path.replace('{SOCIAL_NAME}', socialName);
        return this.backendService.get(path, options, map((response: any) => {
            return response?.data?.user
        }));
    }

    formatUser(data: AuthResponseData) {
        const createdDate = new Date(parseInt(data.createdTime) * 1000);
        const expirationDate = new Date(
            createdDate.getTime() + parseInt(data.expiresIn) * 1000
        );
        const user = new User(
            data.userId,
            data.email,
            data.username,
            data.fullName,
            data.avatar,
            data.roleId,
            data.accessToken,
            data.refreshToken,
            createdDate,
            expirationDate,
            parseInt(data.expiresIn),
            false,
            data.deviceId
        );
        return user;
    }

    getErrorMessage(message: string) {
        switch (message) {
            case 'EMAIL_NOT_FOUND':
                return 'Email Not Found';
            case 'INVALID_PASSWORD':
                return 'Invalid Password';
            case 'EMAIL_EXISTS':
                return 'Email already exists';
            default:
                return 'Unknown error occurred. Please try again';
        }
    }

    setUserInLocalStorage(user: User) {
        this.localStorageService.setUser(user);
        this.runTimeoutInterval(user);
    }

    setOriginalUserInLocalStorage(originalUser: any) {
        this.localStorageService.setItem(originalUser, this.originalUserKey)
    }

    setUserSwitchInLocalStorage(user: User) {
        this.localStorageService.setUser(user);
    }

    runTimeoutInterval(user: User) {
        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval = expirationDate - todaysDate;

        this.timeoutInterval = setTimeout(() => {
            this.store.dispatch(logout());
            //logout functionality or get the refresh token
        }, timeInterval);
    }

    getUserFromLocalStorage() {
        const userData = this.localStorageService.getCurrentUser()
        if (userData) {
            const createdDate = new Date(userData.createdDate);
            const expirationDate = new Date(userData.expirationDate);
            const user = new User(
                userData.userId,
                userData.email,
                userData.username,
                userData.fullName,
                userData.avatar,
                userData.roleId,
                userData.accessToken,
                userData.refreshToken,
                createdDate,
                expirationDate,
                userData.expirationIn,
                userData.canChangePassword || false
            );
            this.runTimeoutInterval(user);
            return user;
        }
        return null;
    }

    getUserOriginalFromLocalStorage() {
        const userData: any = this.localStorageService.get(this.originalUserKey);
        return JSON.parse(userData || null);
    }

    removeUserOriginal() {
        this.localStorageService.remove(this.originalUserKey);
    }

    switchUser(userId: number, encryptBody = true) {
        let url = ''; //this.apiServerPaths.administrator.user.switchUser;
        const verifyClient = true;
        const options = {
            userId,
            encryptBody,
            verifyClient
        };
        return this.backendService.post(url, options, map((response: any) => {
            return response && typeof response.status !== 'undefined' && response.status === 1 ? response.data.user : false
        }));
    }
}
