import {ChangeDetectorRef, Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseComponent} from "../../../../../core/components/base-component";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../../services/authentication.service";
import {Lightbox} from "ngx-lightbox";
import {InventoryDeliveryService} from "../../../../services/inventory.delivery.service";
import {ProductSkuService} from "../../../../services/product.sku.service";
import {InventoryReceiptService} from "../../../../services/inventory.receipt.service";
import * as XLSX from "xlsx";

@Component({
    selector: 'app-warehouse-page-receipt-partial-create',
    templateUrl: './create.component.html',
    styleUrl: './create.component.scss'
})
export class WarehousePageReceiptPartialCreateComponent extends BaseComponent implements OnInit {

    item: any;
    note: string = '';
    skus: any = [];
    isLoading = false;
    displayedColumns: string[] = [
        'sellerSku', 'productName', 'image', 'onHandLogic', 'quantity', 'actions'
    ];

    type = 'supplier'
    presetReceiptTypes = ['order_returned', 'supplier'];

    status = 'draft'
    presetStatues = ['done', 'confirmed', 'canceled', 'draft'];

    isTableScrolled = false;

    suppliers: any = [];
    supplierCustomIds: any = [];
    supplierCustomId: any = 'not-set';

    totalSkus = 0;
    totalItems = 0;
    expectedDate: any = null;
    shippingFee = 0;
    discount = 0;
    vat = 0;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private dialogRef: MatDialogRef<WarehousePageReceiptPartialCreateComponent>,
                private cdr: ChangeDetectorRef,
                private inventoryReceiptService: InventoryReceiptService,
                private productSkuService: ProductSkuService,
                private lightbox: Lightbox,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
        super(activeRoute, translateService, authenticationService, injector);
        this.suppliers = data?.suppliers ?? [];
    }

    override ngOnInit() {
        const user = this.user;
        if (user && user.isAccountant()) {{
            this.displayedColumns = [
                'sellerSku', 'productName', 'image', 'onHandLogic', 'quantity', 'costPrice', 'totalAmount', 'actions'
            ];
        }}

        this.supplierCustomIds = this.suppliers.map((e: any) => e.custom_id);
        this.supplierCustomIds.unshift('not-set');
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

    onSave(event: Event) {
        const supplier = this.suppliers.find((e: any) => e.custom_id === this.supplierCustomId);
        this.isLoading = true;

        this.inventoryReceiptService.create({
            type: this.type,
            status: this.status,
            note: this.note || 'Nhập hàng thực tế',
            skus: this.skus,
            supplier_custom_id: typeof supplier !== 'undefined' ? supplier.custom_id : null,
            supplier_name: typeof supplier !== 'undefined' ? supplier.name : null,
            expected_date: this.expectedDate,
            shipping_fee: this.shippingFee,
            discount: this.discount,
            vat: this.vat
        }).subscribe((result: any) => {
            this.isLoading = false;
            this.dialogRef.close(result)
        });
    }

    onScroll(event: Event) {
        const target = event.target as HTMLElement;
        this.isTableScrolled = target.scrollLeft > 0;
    }

    removeSku(item: any) {
        this.skus = this.skus.filter((e: any) => e.seller_sku !== item.seller_sku);
        this.totalItems = this.skus.reduce((sum: any, item: any) => sum + parseInt(item.quantity), 0);
        this.totalSkus--;
        this.cdr.detectChanges(); // nếu mat-table không tự cập nhật
    }

    onEventSkuSelected(event: any) {
        const type = event?.type ?? 'sku';
        switch (type) {
            case 'product':
                const params = {
                    loadingState: false,
                    'product-id': event?.sku?.productId,
                }
                // get sku of product
                this.productSkuService.search(params).subscribe((result: any) => {
                    const skus = result.skus;
                    for (const i in skus) {
                        if (this.skus.findIndex((e: any) => e.seller_sku === skus[i].code) >= 0) {
                            continue;
                        }

                        this.skus.push({
                            seller_sku: skus[i].code,
                            quantity: skus[i].onHandDb,
                            fields: skus[i].fields,
                            images: skus[i].images,
                            onHandDb: skus[i]?.onHandDb,
                            product: skus[i].product,
                            costPrice: skus[i].costPrice,
                        });
                        this.totalItems += parseInt(skus[i].onHandDb);
                    }
                    this.skus = [...this.skus];
                });
                break;
            case 'sku':
            default:
                if (this.skus.findIndex((e: any) => e.seller_sku === event.sku.code) >= 0) {
                    return;
                }

                this.skus.push({
                    seller_sku: event.sku.code,
                    quantity: event.sku.onHandDb,
                    fields: event.sku.fields,
                    images: event.sku.images,
                    product: event.sku?.product,
                    onHandDb: event.sku.onHandDb,
                    costPrice: event.sku.costPrice,
                });
                this.skus = [...this.skus];
                this.totalItems += parseInt(event.sku.onHandDb);
                break;
        }
    }

    onSelectPresetReceiptTypeChange(event: any) {
        this.type = event.value;
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

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file: File = input?.files[0];
        const reader: FileReader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            // Kiểm tra số sheet
            if (workbook.SheetNames.length === 0) {
                console.error('File không có sheet nào!');
                return;
            }

            const sheetName = workbook.SheetNames[0]; // Sheet thứ 1 (index = 0)
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });

            if (!jsonData.length) return;

            for (const i in jsonData) {
                const row = jsonData[i];
                if (typeof row['Sản phẩm'] === 'undefined' || typeof row['Số lượng'] === 'undefined') {
                    continue;
                }
                let quantity = parseInt(row['Số lượng']);
                if (quantity === 0) {
                    continue;
                }

                this.skus.push({
                    seller_sku: row['Sản phẩm'],
                    quantity: row['Số lượng'],
                    costPrice: 0
                });

                this.totalSkus++;
                this.totalItems += parseInt(row['Số lượng']);
            }
            this.skus = [...this.skus];
            this.cdr.detectChanges(); // nếu mat-table không tự cập nhật

            const skuIds = this.skus.map((e: any) => e.seller_sku);
            const params = {
                loadingState: true,
                'seller-skus': skuIds.join(','),
                type: 'sku'
            }
            this.isLoading = true;
            this.productSkuService.search(params).subscribe((result: any) => {
                this.isLoading = false;
                const skus = result.skus;
                for (const i in skus) {
                    const sku = skus[i];
                    const skuIndex = this.skus.findIndex((e: any) => e.seller_sku === sku.code);
                    if (skuIndex < 0) {
                        continue;
                    }
                    this.skus[skuIndex].fields = sku.fields;
                    this.skus[skuIndex].images = sku.images;
                    this.skus[skuIndex].product = sku.product;
                    this.skus[skuIndex].onHandDb = sku.onHandDb;
                    this.skus[skuIndex].costPrice = sku?.costPrice ?? 0;
                }
                this.skus = [...this.skus];
                this.cdr.detectChanges(); // nếu mat-table không tự cập nhật
            });
        };

        reader.readAsArrayBuffer(file);
    }

    onChangeQuantity(event: any, element: any) {
        element.quantity = event.target.value;
        this.totalItems = this.skus.reduce((sum: any, item: any) => sum + parseInt(item.quantity), 0);
    }

    onChangeCostPrice(event: any, element: any) {
        element.costPrice = event.target.value;
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
}
