import {Component, Injector, OnDestroy} from '@angular/core';
import { Location } from '@angular/common';
import {BaseComponent} from "../../../../core/components/base-component";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {SidenavService} from "../../../../core/services/sidenav.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Clipboard } from '@angular/cdk/clipboard';
import moment from 'moment';
import {StatsSkuService} from "../../../services/stats.sku.service";
import {MatSelectChange} from "@angular/material/select";
import {APP_CONFIG} from "../../../../../../configs/app.config";
import {Lightbox} from "ngx-lightbox";

@Component({
    selector: 'app-warehouse-page-stats-sku',
    templateUrl: './sku.component.html',
    styleUrl: './sku.component.scss'
})
export class WarehousePageStatsSkuComponent extends BaseComponent implements OnDestroy {
    selectedTabIndex = 0;
    tab = 'all'; // to_process | completed | closed
    tabs = ['all', 'ACTIVATE', 'DELETED'];
    tabsStats: any = [];

    skuSorts = [0, 1, 2, 3];
    sort = 0;

    presetDate: any = 'today';
    presetDates = ['today', 'yesterday', 'last7days', 'last28days', 'this_week', 'this_month', 'customize'];

    presetAutoRefresh = 'not-set'
    presetAutoRefreshs = ['not-set', '5s', '10s', '20s'];

    orderSource = 'not-set'
    presetOrderSources = ['not-set', 'facebook', 'tiktok', 'shopee'];

    orderStatus: any = null;
    orderStatuses = APP_CONFIG.status.pancake.statuses;

    stats: any = [];
    products: any = [];
    shops: any = [];
    displayedColumns: string[] = [
        'sellerSku', 'productName', 'totalItems', 'totalOrders'
    ];

    filterCount = 0

    shopId: any = '-1';

    dateType = 'create';

    sellerSku: any = null;

    priceProduct: any = null;

    editSellerSku = '';
    preNameValue = '';

    typeObjects = {
        onHand: 1
    }

    totalItems = 0;
    totalOrders = 0

    private sidenavSubscription: any = null;
    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private sidenavService: SidenavService,
                private lightbox: Lightbox,
                private dialog: MatDialog,
                private location: Location,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar,
                private statsSkuService: StatsSkuService) {
        super(activeRoute, translateService, authenticationService, injector);

        this.activeRoute.queryParams.subscribe((params: any) => {
            this.tab = params.tab ?? 'all';
            this.selectedTabIndex = this.tabs.findIndex((e: any) => e === this.tab) || 0;
            this.currentPage = params.page ?? 1;
            this.currentPage = parseInt(this.currentPage.toString());
            this.pageIndex = this.currentPage - 1;
            this.sellerSku = params['seller-sku'] ?? this.sellerSku;
            this.orderSource = params['source'] ?? 'not-set';
            this.orderStatus = params.status ? params.status.split(',').map(Number) : [];

            this.sort = params.sort ?? this.sort;
            this.sort = parseInt(this.sort.toString());
            this.presetAutoRefresh = params['refresh'] ?? 'not-set';
        });

        this.tabs.forEach((e: any) => {
            this.tabsStats[e] = 0;
        });
    }

    override ngOnInit() {
        super.ngOnInit();

        this.search();
        this.autoRefresh();

        this.sidenavSubscription = this.sidenavService.apply$.subscribe((data: any) => {
            this.startDate = data?.startDate;
            this.endDate = data?.endDate;
            this.shopId = data?.shopId;
            this.dateType = data?.dateType;
            this.presetDate = this.presetDates[this.presetDates.length - 1];

            this.pageIndex = 0;
            this.currentPage = 1;

            this.search();
        });
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.sidenavSubscription.unsubscribe();
        if (this._intervalAutoRefresh) {
            clearInterval(this._intervalAutoRefresh);
        }
    }

    toggleSidenav() {
        this.sidenavService.toggle();
    }

    private _intervalAutoRefresh: any = null;

    autoRefresh() {
        let time = 0;
        switch (this.presetAutoRefresh) {
            case '5s':
                time = 5;
                break;
            case '10s':
                time = 10;
                break;
            case '20s':
                time = 20;
                break;
        }

        if (this._intervalAutoRefresh) {
            clearInterval(this._intervalAutoRefresh);
        }
        if (!time) return;

        this._intervalAutoRefresh = setInterval(() => {
            this.search(false);
        }, time * 1000)
    }

    search(loadingState = true) {
        this.widgetLoadingState = true;
        const params: any = {
            // shop_id: this.shopId,
            loadingState: loadingState,
            source: this.orderSource,
            tab: this.tab,
            page: this.currentPage,
            limit: this.pageSize,
            fd: moment(this.startDate).format('YYYY-MM-DD'),
            td: moment(this.endDate).format('YYYY-MM-DD'),
            sort: this.sort
        }
        if (this.orderStatus && this.orderStatus.length > 0) {
            const statusFilter = this.orderStatus;
            if (statusFilter.every((item: any) => this.orderStatuses.some(e => e.id === item))) {
                params.status = this.orderStatus.join(',');
            } else {
                this.orderStatus = [];
            }
        }
        if (this.sellerSku) {
            params['seller-sku'] = this.sellerSku;
        }

        this.statsSkuService.top(params).subscribe((result: any) => {
            this.products = result.skus;
            this.pageLength = result.count;
            this.totalItems = result?.count_items ?? 0;
            this.totalOrders = result?.count_orders ?? 0;
        });

        const queries: any = [
            `refresh=` + this.presetAutoRefresh
        ];
        for (const i in params) {
            if (i === 'loadingState') {
                continue;
            }
            if (queries[i] !== "" && queries[i] !== null) {
                queries.push(i + "=" + params[i]);
            }
        }
        this.location.replaceState(
            `/warehouse/stats/skus`,
            queries.join("&")
        );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 4 * 1000,
        });
    }

    copy(content: string) {
        this.clipboard.copy(content);
        this.openSnackBar(this.translateService.instant('labels.copySuccess') + ` ${content}`, '');
    }

    onInputSellerSkuEnter(event: any): void {
        const input = (event.target as HTMLInputElement).value;
        this.sellerSku = input;

        this.pageIndex = 0;
        this.currentPage = 1;
        this.search();
    }

    onInputPriceProductEnter(event: any): void {
        const input = (event.target as HTMLInputElement).value;
        this.priceProduct = input;

        this.pageIndex = 0;
        this.currentPage = 1;
        this.search();
    }

    onPageChange(event: any) {
        if (this.loadingState || (this.pageSize === event.pageSize && this.pageIndex === event.pageIndex)) return;

        this.pageIndex = event.pageIndex;
        this.currentPage = event.pageIndex + 1; // Cập nhật trang hiện tại
        this.pageSize = event.pageSize; // Cập nhật số mục mỗi trang
        // Gọi API hoặc xử lý dữ liệu tương ứng
        this.search();
    }

    onSelectPresetAutoRefreshChange(event: any) {
        this.presetAutoRefresh = event.value;
        this.autoRefresh();
    }

    onSelectSortChange(event: any) {
        this.sort = event.value;
        this.search();
    }

    trackById(index: number, item: any): string {
        return item?.seller_sku || index.toString();
    }

    onSelectPresetOrderSourceChange(event: any) {
        this.orderSource = event.value;
        this.search();
    }

    onOrderStatusChange(event: MatSelectChange) {
        const selected = event.value as number[];
        this.orderStatus = selected;
    }

    applyOrderStatus() {
        this.pageIndex = 0;
        this.currentPage = 1;
        this.search();
    }

    openLightBox(caption: string, imageUrl: any): void { // open lightbox
        if (!imageUrl) return;

        const images: any = [{
            caption: caption,
            src: imageUrl
        }];
        this.lightbox.open(images, 0);
    }

    getQueryParams(element: any) {
        return {
            keyword: element.seller_sku,
            fd: this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : '',
            td: this.endDate ? moment(this.endDate).format('YYYY-MM-DD') : ''
        };
    }
}
