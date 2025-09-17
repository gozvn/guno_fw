import {Component, Injector} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../core/components/base-component";
import {TranslateService} from "@ngx-translate/core";
import {SocialAuthService, FacebookLoginProvider, GoogleLoginProvider} from '@abacritt/angularx-social-login';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SocialUser} from "../../models/social.user.model";
import {AuthSocialService} from "../../services/auth.social.service";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
    selector: 'app-auth-page-side-login',
    templateUrl: './side-login.component.html',
    styleUrl: './side-login.component.scss'
})
export class AuthPageSideLoginComponent extends BaseComponent {

    loading = false;

    form: any;

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private router: Router,
                private socialAuthService: SocialAuthService,
                private appAuthSocialService: AuthSocialService) {
        super(activeRoute, translateService, authenticationService, injector);

        this.form = new FormGroup({
            uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
            password: new FormControl('', [Validators.required]),
        });

        if (this.user) {
            this.router.navigate(['/']);
        }
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.subscription = this.socialAuthService.authState.subscribe((socialUser) => {
            this.user = socialUser;
            if (this.user) {
                this.socialLogin();
            }
            // this.loggedIn = (user != null);
        });
    }

    // Đăng nhập với Facebook
    loginWithFacebook() {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(userData => {
            this.user = userData; // Lưu thông tin người dùng
        }).catch(err => {
            console.error('Login failed!', err);
        });
    }

    socialLogin() {
        this.loading = true;
        const socialUser = new SocialUser(
            this.user.id,
            this.user.email,
            this.user.firstName,
            this.user.lastName,
            this.user.name,
            this.user.photoUrl,
            this.user.provider,
            this.user.authToken ?? this.user.idToken
        );
        this.appAuthSocialService.login(socialUser).subscribe((result: any) => {
            if (result && result.accessToken) {
                const user = this.authenticationService.formatUser(result);
                this.authenticationService.setUserInLocalStorage(user);
                this.router.navigate(['/']);
            } else {
                this.router.navigate(['auth', 'error']);
            }
        });
    }

    get f() {
        return this.form.controls;
    }

    submit() {
        console.log(this.form.value);
    }
}
