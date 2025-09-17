import {Component, ElementRef, HostListener, Injector, Input, OnDestroy, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {BaseComponent} from "../../../../core/components/base-component";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {SidenavService} from "../../../../core/services/sidenav.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from '@angular/cdk/clipboard';
import moment from 'moment';
import {FinanceDeptService} from "../../../services/dept.service";
import {OrderService} from "../../../../order/services/order.service";
import {FinancePageDeptPartialDetailComponent} from "../_partials/detail/detail.component";
import {SupplierService} from "../../../../warehouse/services/supplier.service";
import {
    WarehousePageReceiptPartialDetailComponent
} from "../../../../warehouse/pages/receipt/_partials/detail/detail.component";
import {OrderPagePartialDetailComponent} from "../../../../order/_partials/detail/detail.component";

@Component({
    selector: 'app-finance-page-dept-management',
    templateUrl: './management.component.html',
    styleUrl: './management.component.scss'
})
export class FinancePageDeptManagementComponent extends BaseComponent implements OnDestroy {
    selectedTabIndex = 0;
    tab = 'all'; // to_process | completed | closed
    tabs = ['all', 'ACTIVATE', 'DELETED'];
    tabsStats: any = [];

    keyword = '';

    productSorts = [0, 1, 2, 3];
    sort = 1;

    presetDate: any = 'today';
    presetDates = ['today', 'yesterday', 'last7days', 'last28days', 'this_week', 'this_month', 'customize'];

    presetAutoRefresh = 'not-set'
    presetAutoRefreshs = ['not-set', '5s', '10s', '20s'];

    presetType = 'not-set'
    presetTypes = ['not-set', 'accounts_receivable', 'accounts_payable'];

    status = 'not-set'
    presetStatues = ['not-set', 'done', 'confirmed', 'canceled', 'draft'];

    stats: any = [];
    depts: any = [];
    shops: any = [];
    displayedColumns: string[] = [
        'id', 'name', 'description', 'objectId', 'type', 'totalAmount', 'totalPaid', 'supplierName', 'mobile', 'customerName', 'createdBy', 'insertedAt', 'updatedAt', 'status'
    ];

    filterCount = 0

    shopId: any = '-1';
    dateType = 'create';
    type = 'not-set';

    isTableScrolled = false;

    suppliers: any = [];

    private sidenavSubscription: any = null;

    constructor(public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private sidenavService: SidenavService,
                private dialog: MatDialog,
                private location: Location,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar,
                private deptService: FinanceDeptService,
                private supplierService: SupplierService,
                private orderService: OrderService) {
        super(activeRoute, translateService, authenticationService, injector);

        this.activeRoute.queryParams.subscribe((params: any) => {
            this.tab = params.tab ?? 'all';
            this.selectedTabIndex = this.tabs.findIndex((e: any) => e === this.tab) || 0;
            this.currentPage = params.page ?? 1;
            this.currentPage = parseInt(this.currentPage.toString());
            this.pageIndex = this.currentPage - 1;

            this.sort = params.sort ?? this.sort;
            this.keyword = params.keyword ?? '';
            this.status = params.status ?? this.status;
            this.sort = parseInt(this.sort.toString());
            this.presetAutoRefresh = params['refresh'] ?? 'not-set';
            this.presetType = params['type'] ?? 'not-set';
            this.type = this.presetType;
        });

        this.tabs.forEach((e: any) => {
            this.tabsStats[e] = 0;
        });
    }

    override ngOnInit() {
        super.ngOnInit();

        this.getAllSuppiers(false);
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
            if (!this.isTabVisible()) return;
            this.search(false);
        }, time * 1000)
    }

    getAllSuppiers(loadingState = false) {
        this.widgetLoadingState = true;
        const params: any = {}

        this.supplierService.search(params).subscribe((result: any) => {
            this.suppliers = result?.suppliers ?? [];
        });
    }

    search(loadingState = true) {
        this.widgetLoadingState = true;
        const params: any = {
            // shop_id: this.shopId,
            loadingState: loadingState,
            tab: this.tab,
            type: this.type,
            status: this.status,
            page: this.currentPage,
            limit: this.pageSize,
            fd: moment(this.startDate).format('YYYY-MM-DD'),
            td: moment(this.endDate).format('YYYY-MM-DD'),
            sort: this.sort
        }
        if (this.keyword) {
            params.keyword = this.keyword;
        }

        this.deptService.search(params).subscribe((result: any) => {
            this.depts = result?.depts ?? [];
            this.pageLength = result.count;
        });

        const queries: any = [
            `refresh=` + this.presetAutoRefresh,
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
            `/finance/dept`,
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

    onSelectPresetDeliveryTypeChange(event: any) {
        this.pageIndex = 0;
        this.currentPage = 1;
        this.presetType = event.value;
        this.type = event.value;
        this.search();
    }
    onSelectPresetStatusChange(event: any) {
        this.pageIndex = 0;
        this.currentPage = 1;
        this.status = event.value;
        this.search();
    }

    onSelectSortChange(event: any) {
        this.sort = event.value;
        this.search();
    }

    trackById(index: number, item: any): number {
        return item.number; // Sử dụng ID làm giá trị duy nhất
    }

    openDialogDetail(element: any) {
        const dialogRef = this.dialog.open(FinancePageDeptPartialDetailComponent, {
            autoFocus: true,
            width: '95vw',
            height: 'auto',
            panelClass: 'warehouse-dialog-dept-create',
            disableClose: false,
            data: {
                dept: element,
                suppliers: this.suppliers
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result?.dept) {
                element.status = result?.dept.status;
                element.note = result?.dept.note;
            }
        });
    }

    openDialogBillReceiptDetail(element: any) {
        switch (element.object_type) {
            case 'bill':
                this.orderService.getById(element.object_id).subscribe((result: any) => {
                    const order = result;
                    let dialogRef = this.dialog.open(OrderPagePartialDetailComponent, {
                        autoFocus: true,
                        width: '95vw',
                        height: 'auto',
                        panelClass: 'order-dialog-detail',
                        disableClose: false,
                        data: {
                            order_id: element.object_id,
                            order: order
                        }
                    });
                })
                break;
            case 'supplier':
                let dialogRef = this.dialog.open(WarehousePageReceiptPartialDetailComponent, {
                    autoFocus: true,
                    width: '95vw',
                    height: 'auto',
                    panelClass: 'warehouse-dialog-receipt-create',
                    disableClose: false,
                    data: {
                        receipt_number: element.object_id,
                        suppliers: this.suppliers
                    }
                });
                break;
        }
    }

    openDialogCreateDelivery() {

    }

    onInputOrderEnter(event: any): void {
        const input = (event.target as HTMLInputElement).value;
        this.keyword = input;

        this.pageIndex = 0;
        this.currentPage = 1;
        this.search();
    }

    onScroll(event: Event) {
        const target = event.target as HTMLElement;
        this.isTableScrolled = target.scrollLeft > 0;
    }
}
