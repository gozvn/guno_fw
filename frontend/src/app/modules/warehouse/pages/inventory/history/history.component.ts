import {Component, ElementRef, HostListener, Injector, Input, OnDestroy, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {BaseComponent} from "../../../../core/components/base-component";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {SidenavService} from "../../../../core/services/sidenav.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductSkuService} from "../../../services/product.sku.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import { Clipboard } from '@angular/cdk/clipboard';
import moment from 'moment';
import {Lightbox} from "ngx-lightbox";
import {InventoryHistoryService} from "../../../services/inventory.history.service";
import {WarehousePageDeliveryPartialDetailComponent} from "../../delivery/_partials/detail/detail.component";
import {WarehousePageReceiptPartialDetailComponent} from "../../receipt/_partials/detail/detail.component";
import {OrderPagePartialDetailComponent} from "../../../../order/_partials/detail/detail.component";

@Component({
    selector: 'app-warehouse-page-inventory-history',
    templateUrl: './history.component.html',
    styleUrl: './history.component.scss'
})
export class WarehousePageInventoryHistoryComponent extends BaseComponent implements OnDestroy {
    selectedTabIndex = 0;
    tab = 'all'; // to_process | completed | closed
    tabs = ['all', 'ACTIVATE', 'DELETED'];
    tabsStats: any = [];

    skuSorts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    sort = 9;

    presetDate: any = 'today';
    presetDates = ['today', 'yesterday', 'last7days', 'last28days', 'this_week', 'this_month', 'customize'];

    presetAutoRefresh = 'not-set'
    presetAutoRefreshs = ['not-set', '5s', '10s', '20s'];

    status: any = null;

    stats: any = [];
    histories: any = [];
    shops: any = [];
    displayedColumns: string[] = [
        'action', 'note', 'title', 'productName', 'quantity', 'sellableQuantity'
    ];

    filterCount = 0

    shopId: any = '-1';

    dateType = 'create';

    keyword: any = null;

    priceProduct: any = null;

    @Input() required = false; // Is input required?

    typeObjects = {
        onHand: 1
    }

    isTableScrolled = false;

    type = 'supplier';
    presetReceiptType = 'supplier'
    presetReceiptTypes = ['not-set', 'order_returned', 'manual_inventory', 'supplier'];

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
                private inventoryHistoryService: InventoryHistoryService) {
        super(activeRoute, translateService, authenticationService, injector);

        this.activeRoute.queryParams.subscribe((params: any) => {
            this.tab = params.tab ?? 'all';
            this.selectedTabIndex = this.tabs.findIndex((e: any) => e === this.tab) || 0;
            this.currentPage = params.page ?? 1;
            this.currentPage = parseInt(this.currentPage.toString());
            this.pageIndex = this.currentPage - 1;
            this.keyword = params.keyword ?? null;

            this.sort = params.sort ?? this.sort;
            this.sort = parseInt(this.sort.toString());
            this.presetAutoRefresh = params['refresh'] ?? 'not-set';

            this.presetReceiptType = params['type'] ?? this.presetReceiptType;
            this.type = this.presetReceiptType;
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

    onTabChange(event: MatTabChangeEvent): void {
        if (this.loadingState) return;
        this.tab = this.tabs[event.index];
        switch (this.tab) {
            case 'ACTIVATE':
            case 'DELETED':
                this.status = this.tab;
                break;
            default:
                this.status = null;
        }
        this.histories = [];
        this.pageIndex = 0;
        this.currentPage = 1;
        this.search();
    }

    search(loadingState = true) {
        this.widgetLoadingState = true;
        const params: any = {
            // shop_id: this.shopId,
            loadingState: loadingState,
            tab: this.tab,
            type: this.type,
            page: this.currentPage,
            limit: this.pageSize,
            fd: moment(this.startDate).format('YYYY-MM-DD'),
            td: moment(this.endDate).format('YYYY-MM-DD'),
            sort: this.sort
        }
        if (this.keyword) {
            params.keyword = this.keyword;
        }

        this.inventoryHistoryService.search(params).subscribe((result: any) => {
            this.histories = result.histories;
            this.pageLength = result.count;
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
            `/warehouse/inventory/history`,
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
        this.keyword = input;

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
        return item?.id || index.toString();
    }

    openLightBox(caption: string, imageUrl: any): void { // open lightbox
        if (!imageUrl) return;

        const images: any = [{
            caption: caption,
            src: imageUrl
        }];
        this.lightbox.open(images, 0);
    }

    onScroll(event: Event) {
        const target = event.target as HTMLElement;
        this.isTableScrolled = target.scrollLeft > 0;
    }

    onSelectPresetReceiptTypeChange(event: any) {
        this.presetReceiptType = event.value;
        this.type = event.value;
        this.search();
    }

    openDetail(element: any) {
        const type = element.type;
        const objectType = element.object_type;
        switch (type) {
            case 'receipt':
                switch (objectType) {
                    case 'supplier':
                        this.openDialogDetailReceipt(element.object_id);
                        break;
                    case 'order_returned':
                        this.openDialogDetailOrder(element.object_id);
                        break;
                }
                break;
            case 'delivery':
                switch (objectType) {
                    case 'supplier':
                        this.openDialogDetailDelivery(element.object_id);
                        break;
                }
                break;
        }
    }

    openDialogDetailOrder(orderId: any) {
        const dialogRef = this.dialog.open(OrderPagePartialDetailComponent, {
            autoFocus: true,
            width: '95vw',
            height: 'auto',
            panelClass: 'order-dialog-detail',
            disableClose: false,
            data: {
                order_id: orderId
            }
        });
    }

    openDialogDetailReceipt(receiptNumber: any) {
        const dialogRef = this.dialog.open(WarehousePageReceiptPartialDetailComponent, {
            autoFocus: true,
            width: '95vw',
            height: 'auto',
            panelClass: 'warehouse-dialog-receipt-create',
            disableClose: false,
            data: {
                receipt_number: receiptNumber
            }
        });
    }

    openDialogDetailDelivery(deliveryNumber: any) {
        const dialogRef = this.dialog.open(WarehousePageDeliveryPartialDetailComponent, {
            autoFocus: true,
            width: '95vw',
            height: 'auto',
            panelClass: 'warehouse-dialog-delivery-create',
            disableClose: false,
            data: {
                delivery_number: deliveryNumber
            }
        });
    }
}
