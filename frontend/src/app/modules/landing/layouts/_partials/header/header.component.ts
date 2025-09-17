import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {CoreService} from "../../../../../services/core.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import {AppCookieService} from "../../../../../services/app-cookie.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";
import {environment} from "../../../../../../environments/environment";
import {AppSettings} from "../../../../../interfaces/config";
import {AppBrandingComponent} from "../../../../core/layouts/_partials/app-branding/app-branding.component";
import {TablerIconsModule} from "angular-tabler-icons";
import {MaterialModule} from "../../../../../shared/modules/material.module";
import {CommonModule} from "@angular/common";

interface notifications {
    id: number;
    icon: string;
    color: string;
    title: string;
    time: string;
    subtitle: string;
}

interface profiledd {
    id: number;
    title: string;
    link: string;
    new?: boolean;
}

interface apps {
    id: number;
    icon: string;
    color: string;
    title: string;
    subtitle: string;
    link: string;
}

@Component({
    selector: 'app-landing-page-layout-partial-header',
    standalone: true,
    imports: [
        CommonModule, RouterModule, TablerIconsModule, MaterialModule,
        AppBrandingComponent
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class LandingPageLayoutPartialHeaderComponent {

    @Input() showToggle = true;
    @Input() toggleChecked = false;
    @Output() toggleMobileNav = new EventEmitter<void>();
    @Output() toggleMobileFilterNav = new EventEmitter<void>();
    @Output() toggleCollapsed = new EventEmitter<void>();

    showFiller = false;

    user: any = null;

    public selectedLanguage: any = environment.language.list.find(e => environment.language.default === e.code);

    public languages: any[] = environment.language.list;

    public options: AppSettings;

    constructor(
        private router: Router,
        private settings: CoreService,
        private vsidenav: CoreService,
        public dialog: MatDialog,
        private authenticationService: AuthenticationService,
        private translateService: TranslateService,
        private appCookieService: AppCookieService,
        private store: Store<AppState>
    ) {
        const language = this.appCookieService.getLanguage();
        translateService.setDefaultLang(language);
        this.options = this.settings.getOptions();
        this.selectedLanguage = environment.language.list.find(e => language === e.code);

        this.user = this.authenticationService.getUserFromLocalStorage();
    }

    setDark() {
        this.settings.toggleTheme();
    }

    openDialog() {
        // const dialogRef = this.dialog.open(AppHorizontalSearchDialogComponent);
        //
        // dialogRef.afterClosed().subscribe((result) => {
        //     console.log(`Dialog result: ${result}`);
        // });
    }

    changeLanguage(lang: any): void {
        this.translateService.use(lang.code);
        this.appCookieService.setLanguage(lang.code);
        this.selectedLanguage = lang;
    }

    notifications: notifications[] = [
        {
            id: 1,
            icon: 'a-b-2',
            color: 'primary',
            time: '8:30 AM',
            title: 'Launch Admin',
            subtitle: 'Just see the my new admin!',
        },
        {
            id: 2,
            icon: 'calendar',
            color: 'accent',
            time: '8:21 AM',
            title: 'Event today',
            subtitle: 'Just a reminder that you have event',
        },
        {
            id: 3,
            icon: 'settings',
            color: 'warning',
            time: '8:05 AM',
            title: 'Settings',
            subtitle: 'You can customize this template',
        },
        {
            id: 4,
            icon: 'a-b-2',
            color: 'success',
            time: '7:30 AM',
            title: 'Launch Admin',
            subtitle: 'Just see the my new admin!',
        },
        {
            id: 5,
            icon: 'exclamation-circle',
            color: 'error',
            time: '7:03 AM',
            title: 'Event today',
            subtitle: 'Just a reminder that you have event',
        },
    ];

    profiledd: profiledd[] = [
        {
            id: 1,
            title: 'My Profile',
            link: '/',
        },
        {
            id: 2,
            title: 'My Subscription',
            link: '/',
        },
        {
            id: 3,
            title: 'My Invoice',
            new: true,
            link: '/',
        },
        {
            id: 4,
            title: ' Account Settings',
            link: '/',
        },
        {
            id: 5,
            title: 'Sign Out',
            link: '/authentication/login',
        },
    ];

    apps: apps[] = [
        {
            id: 1,
            icon: 'solar:video-library-outline',
            color: 'primary',
            title: 'Livestream',
            subtitle: 'Thông tin livestream hàng ngày',
            link: '/livestream/search',
        },
    ];

    logout() {
        //this.store.dispatch(logout());
        this.authenticationService.logout();
        this.router.navigate(['/', 'auth', 'login']);
    }
}
