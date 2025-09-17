import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthPageSideLoginComponent} from "./pages/side-login/side-login.component";
import {
    FacebookLoginProvider,
    GoogleLoginProvider, GoogleSigninButtonModule,
    SocialAuthServiceConfig,
    SocialLoginModule
} from "@abacritt/angularx-social-login";
import {environment} from "../../../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthPageActivateComponent} from "./pages/activate/activate.component";

@NgModule({
    declarations: [
        AuthPageSideLoginComponent,
        AuthPageActivateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        MaterialModule,
        TranslateModule,
        SocialLoginModule,
        GoogleSigninButtonModule,
    ],
    exports: [
    ],
    providers: []
})
export class AuthModule {
}
