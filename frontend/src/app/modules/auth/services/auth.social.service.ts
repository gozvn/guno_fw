import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BackendService} from "../../../services/backend.service";
import {environment} from "../../../../environments/environment";
import {Subject} from 'rxjs';
import {SocialUser} from "../models/social.user.model";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class AuthSocialService {

    protected apiServerPaths = environment.backendServer.paths;
    public dataBigIdea = new Subject<object>();

    constructor(private http: HttpClient,
                private backendService: BackendService) {
    }

    login(socialUser: SocialUser) {
        const path = this.apiServerPaths.auth.social.login;
        const body: any = socialUser;
        body.encryptBody = true;
        return this.backendService.post(path, body, map((result: any) => {
            return result?.data?.user ?? true;
        }));
    }
}
