import {AfterViewInit, Component, Injector, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../environments/environment";
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "../../../services/authentication.service";
import {MatPaginator} from "@angular/material/paginator";
import {DatePipe} from "@angular/common";
import {NavItem} from "../layouts/_partials/vertical/sidebar/nav-item/nav-item";
import { APP_CONFIG } from "../../../../configs/app.config";
import {TabVisibilityService} from "../../../services/tab-visibility.service";

declare var bootstrap: any; // để dùng class Tooltip từ bootstrap.bundle

@Component({
    selector: 'app-base-component',
    template: ''
})
export class BaseComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    language: any;
    languages = environment.language.list;
    titleKey: any = '';
    user: any = null;

    protected currentPath = '';
    protected loadingState = false;
    protected widgetLoadingState = false;
    protected pageLength = 0;
    protected pageIndex = 0;
    protected pageSize: number = 30;
    protected pageSizeOptions = [5, 10, 20, 30, 50, 100];
    protected currentPage = 1;
    protected subscription: any;

    protected startDate: Date = new Date();
    protected endDate: Date = new Date();
    protected datePipe: DatePipe = new DatePipe('en-US');
    protected fromDate: any;
    protected toDate: any;
    protected currentDate: Date = new Date();

    protected defaultParams: any;
    private titleService: Title;
    protected config = APP_CONFIG;

    protected tabVisibilityService: TabVisibilityService;
    protected isTabActive: boolean = true;
    
    constructor(protected activeRoute: ActivatedRoute,
                protected translateService: TranslateService,
                protected authenticationService: AuthenticationService,
                protected injector: Injector) {

        this.tabVisibilityService = this.injector.get(TabVisibilityService);

        this.titleService = new Title(document);
        this.defaultParams = this.activeRoute.snapshot.data['defaultParams'];
        this.currentPath = this.getFullPath();

        this.activeRoute.queryParams.subscribe((params: any) => {
            const dateRegex = new RegExp(/([\d]{4})\-([\d]{1,2})\-([0-9]{1,2})/i);
            if (typeof(params.fd) !== 'undefined' && dateRegex.test(params.fd)) {
                this.startDate = new Date(params.fd);
            } else {
                // today.setDate(today.getDate());
                // this.startDate = today;
            }

            if (typeof(params.td) !== 'undefined' && dateRegex.test(params.td)) {
                this.endDate = new Date(params.td.toString());
            } else {
                this.endDate = new Date();
            }
        });

        this.activeRoute.data.subscribe((data) => {
            this.titleKey = data['title'] ?? '';
            if (!this.titleKey) return;

            this.translateService.get(this.titleKey).subscribe((text: string) => {
                this.setTitle(this.titleKey);
            });
        });

        this.user = this.authenticationService.getUserFromLocalStorage();
    }

    ngOnInit() {
        this.language = this.translateService.currentLang;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterViewInit(): void {

    }

    protected isTabVisible(): boolean {
        return this.tabVisibilityService.isTabActive;
    }

    public setTitle(key: string) {
        const title = `${this.translateService.instant(key)} | ${this.translateService.instant('appName')}`;
        this.titleService.setTitle(title);
    }

    public onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = './assets/styles/default/images/profile/user-2.jpg';
        target.className = 'rounded image-gray';
    }

    visibilityChangeHandler = () => {
        this.isTabActive = document.visibilityState === 'visible';
    };

    isAllow(item: NavItem) {
        if (!this.user) return false;

        if (this.user.roleId === environment.roles.superAdmin || this.user.roleId === environment.roles.admin) {
            return true;
        }

        return item?.roles?.includes(this.user.roleId);
    }

    getFullPath(): string {
        let path = '';
        let currentRoute: ActivatedRoute | null = this.activeRoute;

        while (currentRoute) {
            const routePath = currentRoute.snapshot.routeConfig?.path;
            if (routePath) {
                path = routePath + '/' + path;
            }
            currentRoute = currentRoute.parent;
        }

        return '/' + path.replace(/\/$/, ''); // Loại bỏ dấu '/' cuối cùng
    }
}
