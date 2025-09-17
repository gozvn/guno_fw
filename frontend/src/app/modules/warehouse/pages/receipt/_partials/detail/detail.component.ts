import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {InventoryReceiptService} from "../../../../services/inventory.receipt.service";
import {BaseComponent} from "../../../../../core/components/base-component";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../../services/authentication.service";
import {Lightbox} from "ngx-lightbox";

@Component({
    selector: 'app-warehouse-page-receipt-partial-detail',
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class WarehousePageReceiptPartialDetailComponent extends BaseComponent implements OnInit {

    receiptNumber: any;
    receipt: any;
    skus: any = [];

    displayedColumns: string[] = [
        'sellerSku', 'productName', 'image', 'quantity', 'actions'
    ];

    type = 'supplier'
    presetReceiptTypes = ['order_returned', 'manual_inventory', 'supplier'];

    status = 'done'
    presetStatues = ['done', 'confirmed', 'canceled', 'draft'];

    isTableScrolled = false;

    isLoading = false;

    suppliers: any = [];
    supplierCustomIds: any = [];
    supplierCustomId: any = 'not-set';

    totalItems = 0;

    expectedDate: any = null;
    shippingFee: any = 0;
    discount: any = 0;
    vat: any = 0;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private inventoryReceiptService: InventoryReceiptService,
                private lightbox: Lightbox,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
        super(activeRoute, translateService, authenticationService, injector);
        this.receiptNumber = data?.receipt_number;
        this.receipt = data?.receipt;
        this.totalItems = this.receipt?.total_quantity ?? 0;
        this.type = this.receipt?.type;
        this.status = this.receipt?.status;
        this.supplierCustomId = this.receipt?.supplier_custom_id ?? null;
        this.suppliers = data?.suppliers ?? [];
    }

    getItems() {
        this.isLoading = true;
        this.inventoryReceiptService.getItemByNumber(this.receipt?.number ?? this.receiptNumber).subscribe((result: any) => {
            this.skus = result?.items ?? [];
            this.receipt = result?.receipt ?? false;
            this.totalItems = this.receipt?.total_quantity ?? 0;
            this.type = this.receipt?.type;
            this.status = this.receipt?.status;
            this.supplierCustomId = this.receipt?.supplier_custom_id ?? null;
            this.expectedDate = this.receipt?.expected_at ?? null;
            this.shippingFee = this.receipt?.shipping_fee.toLocaleString('vi-VN') ?? 0;
            this.discount = this.receipt?.discount ?? 0;
            this.vat = this.receipt?.vat ?? 0;

            this.isLoading = false;
        });
    }

    override ngOnInit() {
        const user = this.user;
        if (user && user.isAccountant()) {{
            this.displayedColumns = [
                'sellerSku', 'productName', 'image', 'quantity', 'costPrice', 'totalAmount', 'actions'
            ];
        }}

        switch (this.type) {
            case 'order_returned':
                this.displayedColumns = this.displayedColumns.filter(col => col !== 'costPrice' && col !== 'totalAmount');
                break;
        }

        this.supplierCustomIds = this.suppliers.map((e: any) => e.custom_id);
        this.supplierCustomIds.unshift('not-set');

        this.getItems();
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

    onSave(event: Event) {
        this.isLoading = true;
        this.inventoryReceiptService.update(this.receipt.number, {
            note: this.receipt.note,
            status: this.status,
            supplierCustomId: this.supplierCustomId,
            expectedDate: this.expectedDate,
            shippingFee: this.shippingFee.toString().replace(/\D/g, ''),
            discount: this.discount,
            vat: this.vat
        }).subscribe((result: any) => {
            this.isLoading = false;
            this.openSnackBar(this.translateService.instant('labels.updateSuccess'), '');
            const receipt = result?.receipt ?? false;
            if (!receipt) {
                return;
            }

            this.receipt.supplier_name = receipt.supplier_name;
            this.receipt.supplier_custom_id = receipt.supplier_custom_id;
        });
    }

    onSelectPresetReceiptTypeChange(event: any) {
        this.type = event.value;
        // this.receipt.type = this.type;
    }

    onSelectPresetStatusChange(event: any) {
        this.status = event.value;
    }

    onSelectPresetSupplierChange(event: any) {
        this.supplierCustomId = event.value;
    }

    getSupplierName(customId: any) {
        const supplier = this.suppliers.find((e: any) => e.custom_id === customId);
        return typeof supplier !== 'undefined' ? supplier.name : 'N/A'
    }

    onChangeShippingFee(event: any) {
        const shippingFee = event.target.value.replace(/\D/g, '');
        this.shippingFee = parseInt(shippingFee || '0', 10);
        event.target.value = this.shippingFee.toLocaleString('vi-VN');
    }

    onChangeDiscount(event: any) {
        const discount = event.target.value.replace(/\D/g, '');
        this.discount = parseInt(discount || '0', 10);
        event.target.value = this.discount.toLocaleString('vi-VN');
    }

    onChangeVAT(event: any) {
        let input = event.target.value;

        // Chỉ cho nhập số và dấu phẩy
        let inputFormatted = input.replace(/[^0-9\,]/g, '');

        // Chuyển sang float để lưu trữ (đổi , -> .)
        let vat = parseFloat(inputFormatted.replace(',', '.'));

        if (isNaN(vat)) {
            vat = 0;
        }

        // Giới hạn 0–100
        if (vat > 100) vat = 100;
        if (vat < 0) vat = 0;
        this.vat = vat; // Lưu trữ dạng số, ví dụ 5.6
        // Hiển thị lại theo kiểu VN: giữ dấu phẩy
        event.target.value = vat.toString().replace(/[\.]/g, ',');
    }

    getUsername(email: any) {
        if (!email) {
            return null;
        }

        return email.split('@')[0];
    }
}
