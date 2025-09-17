import { ApplicationConfig, importProvidersFrom,
    provideZoneChangeDetection, isDevMode,
    LOCALE_ID
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    provideHttpClient,
    withInterceptorsFromDi
} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {environment} from "../environments/environment";
import {TablerIconsModule} from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import {EncryptRequestInterceptor} from "./interceptors/encrypt.request.interceptor";
import {DecryptResponseInterceptor} from "./interceptors/decrypt.response.interceptor";
import {provideServiceWorker} from '@angular/service-worker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./modules/auth/store/auth.reducer";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {provideQuillConfig} from "ngx-quill";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, provideNativeDateAdapter} from "@angular/material/core";
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import {provideHighlightOptions} from "ngx-highlightjs";
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {LoadingPaceInterceptor} from "./interceptors/loading.pace.interceptor";
import {SocketModule} from "./shared/modules/socket/socket.module";
import {registerLocaleData} from "@angular/common";
import localeVi from "@angular/common/locales/vi";

// Đăng ký locale Việt Nam
registerLocaleData(localeVi, 'vi-VN');

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + environment.version);
}

export const MY_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',         // Định dạng hiển thị trong input
        monthYearLabel: 'MM YYYY',        // Định dạng cho tháng-năm trong picker
        dateA11yLabel: 'LL',              // Định dạng cho accessibility
        monthYearA11yLabel: 'MMMM YYYY',  // Định dạng tháng-năm cho accessibility
    },
};

const socketModule = SocketModule.forRoot({
    mode: environment.socket.mode,
    url: environment.socket.url ?? window.location.origin,
    options: {
        path: environment.socket.path,
        transports: ['websocket']
    }
});
const socketProviders = socketModule?.providers ?? []; // fallback về []

export const appConfig: ApplicationConfig = {
    providers: [
        ...socketProviders,
        { provide: LOCALE_ID, useValue: 'vi-VN' }, // set mặc định cho app
        provideZoneChangeDetection({eventCoalescing: true}),
        importProvidersFrom([
            FormsModule,
            ReactiveFormsModule,
            CalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory,
            }),
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [HttpClient]
                },
                defaultLanguage: environment.language.default,
            }),
            TablerIconsModule.pick(TablerIcons),
            StoreModule.forRoot({ auth: authReducer }),
            //EffectsModule.forRoot(AuthEffects)
        ]),
        provideHttpClient(withInterceptorsFromDi()),
        // provideClientHydration(), // for ssr
        provideAnimationsAsync(),
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: LoadingPaceInterceptor, multi: true },
        {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}, // loading state
        {provide: HTTP_INTERCEPTORS, useClass: EncryptRequestInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: DecryptResponseInterceptor, multi: true},
        provideServiceWorker('app-sw.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        }),
        // provideServiceWorker('fcm-messaging-sw.js', {
        //     enabled: environment.production
        // }),
        // provideStore({ auth: authReducer }), // Cung cấp reducer cho store
        // provideEffects(AuthEffects),           // Cung cấp
        provideRouter(routes),                // Cung cấp router
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                lang: environment.language.default,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            environment.google.auth.clientId
                        )
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider(environment.facebook.appId)
                    }
                ],
                onError: (err) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        },
        provideQuillConfig({
            modules: {
                syntax: false,
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],

                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction

                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    //[{ 'font': [] }],
                    [{ 'align': [] }],

                    ['clean'],                                         // remove formatting button

                    //['link', 'image', 'video']
                ]
            }
        }),
        provideHighlightOptions({
            fullLibraryLoader: () => import('highlight.js')
        }),
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        provideNativeDateAdapter()
    ]
};
