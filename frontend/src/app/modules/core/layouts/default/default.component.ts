import {AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../_partials/header/header.component";
import {FooterComponent} from "../_partials/footer/footer.component";
import {AppHorizontalHeaderComponent} from "../_partials/app-horizontal-header/app-horizontal-header.component";
import {CoreService} from "../../../../services/core.service";
import {AppSettings} from "../../../../interfaces/config";
import {MaterialModule} from "../../../../shared/modules/material.module";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatSidenav, MatSidenavContent} from "@angular/material/sidenav";
import {CommonModule} from "@angular/common";
import {BaseComponent} from "../../components/base-component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../services/authentication.service";
import {SidenavService} from "../../services/sidenav.service";
import {Subscription} from "rxjs";
import {SharedModule} from "../../../../shared/shared.module";
import {AppNavItemComponent} from "../_partials/sidebar/nav-item/nav-item.component";
import {AppHorizontalSidebarComponent} from "../_partials/horizontal/sidebar/sidebar.component";
import {AppVerticalSidebarComponent} from "../_partials/vertical/sidebar/sidebar.component";
import {filter} from "rxjs/operators";
import {BreakpointObserver} from "@angular/cdk/layout";
import {AppVerticalNavItemComponent} from "../_partials/vertical/sidebar/nav-item/nav-item.component";
import {navItems} from '../_partials/horizontal/sidebar/sidebar-data';
import {sidenavItems} from '../_partials/vertical/sidebar/sidebar-data';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';

interface apps {
    id: number;
    icon: string;
    color: string;
    title: string;
    subtitle: string;
    link: string;
}

interface NavItem {
    displayName?: string;
    disabled?: boolean;
    external?: boolean;
    twoLines?: boolean;
    divider?: boolean;
    chip?: boolean;
    iconName?: string;
    navCap?: string;
    chipContent?: string;
    chipClass?: string;
    subtext?: string;
    route?: string;
    children?: NavItem[];
    ddType?: string;
    subItemIcon?: boolean;
}

@Component({
    selector: 'app-layout-default',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        AppHorizontalHeaderComponent,
        AppHorizontalSidebarComponent,
        AppVerticalSidebarComponent,
        AppVerticalNavItemComponent,
        AppNavItemComponent,
        MaterialModule,
        SharedModule,
        TablerIconsModule,
        TranslateModule
    ],
    templateUrl: './default.component.html',
    styleUrl: './default.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class LayoutDefaultComponent extends BaseComponent implements OnDestroy, AfterViewInit {

    private htmlElement!: HTMLHtmlElement;
    navItems = navItems;

    sidenavItems = sidenavItems;

    options: any;

    apps: apps[] = [
        {
            id: 1,
            icon: 'solar:video-library-outline',
            color: 'primary',
            title: 'Livestream',
            subtitle: 'Thông tin livestream hàng ngày',
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
            subtitle: 'Quản lý đơn trả hàng/hoàn tiền',
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

    resView = false;

    private layoutChangesSubscription = Subscription.EMPTY;
    private isMobileScreen = false;
    private isContentWidthFixed = true;
    private isCollapsedWidthFixed = false;

    currentUrl: string = '';

    @ViewChild('content', { static: true }) content!: MatSidenavContent;
    @ViewChild('sidenav') sidenav: any;
    @ViewChild('customizerRight', { static: true }) customizerRight!: MatSidenav;

    constructor(override activeRoute: ActivatedRoute,
                override translateService: TranslateService,
                override authenticationService: AuthenticationService,
                override injector: Injector,
                private router: Router,
                private breakpointObserver: BreakpointObserver,
                private sidenavService: SidenavService,
                private settings: CoreService) {

        super(activeRoute, translateService, authenticationService, injector);

        this.htmlElement = document.querySelector('html')!;
        this.options = this.settings.getOptions();

        this.htmlElement = document.querySelector('html')!;
        this.layoutChangesSubscription = this.breakpointObserver
            .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
            .subscribe((state) => {
                // SidenavOpened must be reset true when layout changes
                this.options.sidenavOpened = true;
                this.isMobileScreen = state.breakpoints[BELOWMONITOR];
                if (this.options.sidenavCollapsed == false) {
                    this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
                }
                this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
                this.resView = state.breakpoints[BELOWMONITOR];
            });

        // Initialize project theme with options
        this.receiveOptions(this.options);

        // This is for scroll to top
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((e) => {
                this.currentUrl = e.urlAfterRedirects;
                this.content.scrollTo({ top: 0 });
            });
    }

    override ngAfterViewInit() {
        this.sidenavService.setSidenav(this.customizerRight);
    }

    get isOver(): boolean {
        return this.isMobileScreen;
    }

    get isTablet(): boolean {
        return this.resView;
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.layoutChangesSubscription.unsubscribe();
    }

    toggleCollapsed() {
        this.isContentWidthFixed = false;
        this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
        this.resetCollapsedState();
    }

    resetCollapsedState(timer = 400) {
        setTimeout(() => this.settings.setOptions(this.options), timer);
    }

    onSidenavClosedStart() {
        this.isContentWidthFixed = false;
    }

    onSidenavOpenedChange(isOpened: boolean) {
        this.isCollapsedWidthFixed = !this.isOver;
        this.options.sidenavOpened = isOpened;
        this.settings.setOptions(this.options);
    }

    receiveOptions(options: AppSettings): void {
        this.options = options;
        this.toggleDarkTheme(options);
    }

    toggleDarkTheme(options: AppSettings) {
        if (options.theme === 'dark') {
            this.htmlElement.classList.add('dark-theme');
            this.htmlElement.classList.remove('light-theme');
        } else {
            this.htmlElement.classList.remove('dark-theme');
            this.htmlElement.classList.add('light-theme');
        }
    }
}
