import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../../../../../services/core.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {TablerIconsModule} from "angular-tabler-icons";
import {MaterialModule} from "../../../../../shared/modules/material.module";
import {AppSettings} from "../../../../../interfaces/config";
import {AppBrandingComponent} from "../app-branding/app-branding.component";
import {environment} from "../../../../../../environments/environment";
import {AppCookieService} from "../../../../../services/app-cookie.service";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.state";
import {CommonModule} from "@angular/common";
import {BaseComponent} from "../../../components/base-component";

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
    selector: 'app-horizontal-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule, TablerIconsModule, MaterialModule,
        AppBrandingComponent, TranslateModule
    ],
    templateUrl: './app-horizontal-header.component.html',
    styleUrl: './app-horizontal-header.component.scss'
})
export class AppHorizontalHeaderComponent extends BaseComponent {

    @Input() showToggle = true;
    @Input() toggleChecked = false;
    @Output() toggleMobileNav = new EventEmitter<void>();
    @Output() toggleMobileFilterNav = new EventEmitter<void>();
    @Output() toggleCollapsed = new EventEmitter<void>();

    showFiller = false;

    public selectedLanguage: any;

    public options: AppSettings;

    constructor(
        override activeRoute: ActivatedRoute,
        override translateService: TranslateService,
        override authenticationService: AuthenticationService,
        public override injector: Injector,
        private router: Router,
        private settings: CoreService,
        private vsidenav: CoreService,
        public dialog: MatDialog,
        private appCookieService: AppCookieService,
        private store: Store<AppState>
    ) {
        super(activeRoute, translateService, authenticationService, injector);

        const currentLang = this.appCookieService.getLanguage();
        translateService.setDefaultLang(currentLang);
        this.options = this.settings.getOptions();
        this.selectedLanguage = environment.language.list.find(e => currentLang === e.code);
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
        // {
        //     id: 1,
        //     title: 'My Profile',
        //     link: '/',
        // },
    ];

    apps: apps[] = [
        {
            id: 1,
            icon: 'solar:video-library-outline',
            color: 'primary',
            title: 'Livestream',
            subtitle: 'Livestream hàng ngày',
            link: '/livestream/search',
        },
        {
            id: 2,
            icon: 'solar:cart-large-3-linear',
            color: 'primary',
            title: 'Đơn hàng',
            subtitle: 'Quản lý đơn hàng',
            link: '/order',
        },
        {
            id: 3,
            icon: 'solar:bill-cross-broken',
            color: 'primary',
            title: 'Đơn hàng hủy',
            subtitle: 'Quản lý yêu cầu hủy',
            link: '/order/cancellation',
        },
        {
            id: 4,
            icon: 'solar:square-double-alt-arrow-left-outline',
            color: 'warning',
            title: 'Trả hàng',
            subtitle: 'Quản lý đơn trả hàng/hoàn tiền (cũ)',
            link: '/order/return',
        },
        {
            id: 5,
            icon: 'solar:monitor-broken',
            color: 'warning',
            title: 'Queue Dashboard',
            subtitle: 'Theo dõi các hàng đợi (queues)',
            link: '/queue/dashboard',
        },
        {
            id: 6,
            icon: 'solar:folder-path-connect-outline',
            color: 'success',
            title: 'Tiktok Shop',
            subtitle: 'Kết nối với Tiktok Shop',
            link: '/tiktok-shop/partner/seller',
        },
        {
            id: 7,
            icon: 'solar:chart-bold',
            color: 'error',
            title: 'Báo cáo',
            subtitle: 'Xem thống kế đơn hàng, doanh thu',
            link: '/dashboard',
        },
        {
            id: 8,
            icon: 'mdi:dollar',
            color: 'success',
            title: 'Tài chính',
            subtitle: 'Báo cáo tài chính, kết quả kinh doanh',
            link: '/order/finance',
        }
    ];

    logout() {
        //this.store.dispatch(logout());
        this.authenticationService.logout();
        window.location.href = '/'
    }
}
