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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-warehouse-page-sku-management',
    templateUrl: './management.component.html',
    styleUrl: './management.component.scss'
})
export class WarehousePageSkuManagementComponent extends BaseComponent implements OnDestroy {
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
    products: any = [];
    shops: any = [];
    displayedColumns: string[] = [
        'title', 'sellerProduct', 'totalQuantity', 'onHandLogic', 'pancakeActualRemainQuantity', 'sellableQuantity', 'pancakeRemainQuantity', 'reserved', 'onShipping', 'received', 'returning', 'returned'
    ];

    filterCount = 0

    shopId: any = '-1';

    dateType = 'create';

    keyword: any = null;

    priceProduct: any = null;

    @Input() required = false; // Is input required?
    @Input() type = 'text'; // The type of input element
    @ViewChild('inlineEditControlName') inlineEditControlName!: ElementRef; // input DOM element
    editSellerSku = '';
    preNameValue = '';

    typeObjects = {
        onHand: 1
    }

    isTableScrolled = false;

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
                private productSkuService: ProductSkuService) {
        super(activeRoute, translateService, authenticationService, injector);

        this.activeRoute.queryParams.subscribe((params: any) => {
            this.tab = params.tab ?? 'all';
            this.selectedTabIndex = this.tabs.findIndex((e: any) => e === this.tab) || 0;
            this.currentPage = params.page ?? 1;
            this.pageSize = params.limit ?? 30;
            this.currentPage = parseInt(this.currentPage.toString());
            this.pageIndex = this.currentPage - 1;
            this.keyword = params.keyword ?? null;

            this.sort = params.sort ?? this.sort;
            this.sort = parseInt(this.sort.toString());
            this.presetAutoRefresh = params['refresh'] ?? 'not-set';
        });

        this.tabs.forEach((e: any) => {
            this.tabsStats[e] = 0;
        });

        if (this.user.isAdmin()) {
            this.displayedColumns = [
                'title', 'sellerProduct', 'costPrice', 'totalQuantity', 'onHandLogic', 'pancakeActualRemainQuantity', 'sellableQuantity', 'pancakeRemainQuantity', 'reserved', 'onShipping', 'received', 'returning', 'returned'
            ];
        }
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
        this.products = [];
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
            page: this.currentPage,
            limit: this.pageSize,
            fd: moment(this.startDate).format('YYYY-MM-DD'),
            td: moment(this.endDate).format('YYYY-MM-DD'),
            sort: this.sort
        }
        if (this.keyword) {
            params.keyword = this.keyword;
        }

        this.productSkuService.search(params).subscribe((result: any) => {
            this.products = result.skus;
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
            `/warehouse/sku/management`,
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
        return item?.code || index.toString();
    }

    //Optimize
    @HostListener('keypress', ['$event'])
    onKeyPressInput(event: any, sku: any, type: number) {
        if (event.key === 'Enter' && event.target.value !== '') {
            let typeInput: number = 0
            switch (type) {
                case this.typeObjects.onHand:
                    typeInput = this.typeObjects.onHand
                    break;
                default:
                    break;
            }

            this.saveValue(sku, typeInput);
        }
    }

    editValue(value: any, sku: any, type: number) {
        switch (type) {
            case this.typeObjects.onHand:
                this.preNameValue = value;
                this.editSellerSku = sku.code;
                // Focus on the input element just as the editing begins
                setTimeout(() => {
                    this.inlineEditControlName.nativeElement.focus()
                });
                break;
            default:
                break;
        }
    }

    saveValue(sku: any, typeValue: number) {
        if (sku == null) {
            return
        }

        let newValue = 0;
        let type = 'onHand';


        const sellerSku = sku.code;
        switch (typeValue) {
            case this.typeObjects.onHand:
                type = 'onHand'
                newValue = parseInt(this.inlineEditControlName.nativeElement.value);
                // const indexName = this.routes.findIndex((e: any) => e.id === routeId);
                this.editSellerSku = '';
                break;
            default:
                break;
        }

        this.productSkuService.update(sellerSku, type, newValue).subscribe((result: any) => {
            sku.totalQuantity = result?.totalQuantity ?? 0;
            sku.onHandDb = result?.onHandDb ?? 0;
            sku.onHand = result?.onHand ?? 0;
            sku.sellableQuantity = result?.sellableQuantity ?? 0;
            this.openSnackBar(this.translateService.instant('labels.updateSuccess'), '');
        });
    }

    openLightBox(caption: string, imageUrl: any): void { // open lightbox
        if (!imageUrl) return;

        const images: any = [{
            caption: caption,
            src: imageUrl
        }];
        this.lightbox.open(images, 0);
    }

    onChangeCostPrice(event: any, element: any) {
        const costPrice = event.target.value.replace(/\D/g, '');
        this.productSkuService.update(element.code, 'costPrice', costPrice).subscribe((result: any) => {
            element.costPrice = costPrice;
            this.openSnackBar(this.translateService.instant('labels.updateSuccess'), '');
        });
    }

    onKeyupCostPrice(event: any, element: any) {
        const input = event.target as HTMLInputElement;

        // Lấy giá trị nhập vào và loại bỏ ký tự không phải số
        const numeric = input.value.replace(/\D/g, '');
        console.log(numeric)
        // Format lại để hiển thị trong textbox
        element.costPrice = numeric;
    }

    onScroll(event: Event) {
        const target = event.target as HTMLElement;
        this.isTableScrolled = target.scrollLeft > 0;
    }

    exportExcel(event: any) {
        this.loadingState = true;
        const params: any = {
            // shop_id: this.shopId,
            sort: this.sort
        }
        if (this.keyword) {
            params.keyword = this.keyword;
        }

        const fileName = 'report-skus-' + moment().format('YYYY-MM-DD HH:mm:ss') + '.xlsx';
        this.productSkuService.export(params).subscribe((result: any) => {
            const skus = result.skus;
            this.loadingState = false;

            // Chuyển JSON thành worksheet
            const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(skus);

            // Tạo workbook và gắn worksheet vào
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Kho hàng');

            // Xuất ra định dạng array buffer
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

            // Tạo blob để tải file
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            saveAs(blob, fileName);
        });
    }
}
