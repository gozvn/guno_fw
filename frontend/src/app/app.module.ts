import { NgModule, LOCALE_ID } from '@angular/core';
// Import cho locale
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LayoutDefaultComponent} from "./modules/core/layouts/default/default.component";
import {HeaderComponent} from "./modules/core/layouts/_partials/header/header.component";
import {FooterComponent} from "./modules/core/layouts/_partials/footer/footer.component";
import {MaterialModule} from "./shared/modules/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";
import {BaseComponent} from "./modules/core/components/base-component";
import {LayoutBlankComponent} from "./modules/core/layouts/blank/blank.component";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../environments/environment";
import {
    AppHorizontalHeaderComponent
} from "./modules/core/layouts/_partials/app-horizontal-header/app-horizontal-header.component";
import {AppBrandingComponent} from "./modules/core/layouts/_partials/app-branding/app-branding.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LandingPageLayoutDefaultComponent} from "./modules/landing/layouts/default/default.component";
import {LandingPageLayoutPartialHeaderComponent} from "./modules/landing/layouts/_partials/header/header.component";
import {LandingPageLayoutPartialFooterComponent} from "./modules/landing/layouts/_partials/footer/footer.component";
import {LayoutAuthComponent} from "./modules/core/layouts/auth/auth.component";
import {
    DialogConfirmReloadNewVersionComponent
} from "./modules/core/components/dialogs/confirm-reload-new-version/confirm-reload-new-version.component";
import {PaginatorComponent} from "./modules/core/components/paginator/paginator.component";
import {SharedModule} from "./shared/shared.module";
import {DialogConfirmActionComponent} from "./modules/core/components/dialogs/confirm-action/confirm-action.component";
import {LazyLoadImageDirective} from "./directives/lazyload.image.directive";
import {AppNavItemComponent} from "./modules/core/layouts/_partials/sidebar/nav-item/nav-item.component";
import {
    AppHorizontalSidebarComponent
} from "./modules/core/layouts/_partials/horizontal/sidebar/sidebar.component";
import {
    AppHorizontalNavItemComponent
} from "./modules/core/layouts/_partials/horizontal/sidebar/nav-item/nav-item.component";
import {
    AppVerticalNavItemComponent
} from "./modules/core/layouts/_partials/vertical/sidebar/nav-item/nav-item.component";
import {
    AppVerticalSidebarComponent
} from "./modules/core/layouts/_partials/vertical/sidebar/sidebar.component";
import {AppVerticalBrandingComponent} from "./modules/core/layouts/_partials/vertical/sidebar/branding.component";
import {
    LayoutDefaultSidebarVerticalComponent
} from "./modules/core/layouts/default-sidebar-vertical/default-sidebar-vertical.component";
import {SocketModule} from "./shared/modules/socket/socket.module";
import {
    LayoutReportSidebarVerticalComponent
} from "./modules/core/layouts/report-sidebar-vertical/report-sidebar-vertical.component";

// Đăng ký locale Việt Nam
registerLocaleData(localeVi, 'vi-VN');

@NgModule({
    declarations: [
        AppComponent,
        BaseComponent,
        DialogConfirmReloadNewVersionComponent,
        DialogConfirmActionComponent,
        // layout default
        LayoutDefaultComponent,
        // layout default sidebar vertical
        LayoutDefaultSidebarVerticalComponent,
        // layout report sidebar vertical
        LayoutReportSidebarVerticalComponent,
        // layout auth
        LayoutAuthComponent,
        // layout blank
        LayoutBlankComponent,
        // layout landing
        LandingPageLayoutDefaultComponent,
        LandingPageLayoutPartialHeaderComponent,
        LandingPageLayoutPartialFooterComponent,
        // partials
        HeaderComponent,
        FooterComponent,
        // horizontal
        AppHorizontalHeaderComponent,
        AppHorizontalSidebarComponent,
        AppHorizontalNavItemComponent,
        // vertical
        AppVerticalBrandingComponent,
        AppVerticalSidebarComponent,
        AppVerticalNavItemComponent,
        AppNavItemComponent,
        AppBrandingComponent,
        // directives
        LazyLoadImageDirective
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        SharedModule,
        MaterialModule,
        TranslateModule,
        SocketModule.forRoot({
            mode: "",
            url: environment.socket.url || window.location.origin,
            options: { transports: ['websocket'] }
        }),
        ServiceWorkerModule.register('app-sw.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            registrationStrategy: 'registerWhenStable:30000'
        }),
        // ServiceWorkerModule.register('fcm-messaging-sw.js', {
        //     enabled: environment.production
        // })
    ],
    exports: [
        AppHorizontalHeaderComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'vi-VN' } // set mặc định cho app
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
