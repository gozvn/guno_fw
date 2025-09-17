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

@Component({
    selector: 'app-warehouse-page-delivery-partial-create',
    templateUrl: './create.component.html',
    styleUrl: './create.component.scss'
})
export class WarehousePageDeliveryPartialCreateComponent extends BaseComponent implements OnInit {

    item: any;
    note: string = '';
    skus: any = [];
    isLoading = false;
    displayedColumns: string[] = [
        'sellerSku', 'productName', 'image', 'quantity', 'actions'
    ];

    type = 'bill'
    presetReceiptTypes = ['bill', 'supplier_return', 'faulty_product'];

    status = 'done'
    presetStatues = ['done', 'confirmed', 'canceled', 'draft'];

    isTableScrolled = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private dialogRef: MatDialogRef<WarehousePageDeliveryPartialCreateComponent>,
                private cdr: ChangeDetectorRef,
                private inventoryDeliveryService: InventoryDeliveryService,
                private productSkuService: ProductSkuService,
                private lightbox: Lightbox,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
        super(activeRoute, translateService, authenticationService, injector);
    }

    override ngOnInit() {
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
        this.isLoading = true;
        this.inventoryDeliveryService.create({
            type: this.type,
            status: this.status,
            note: this.note,
            skus: this.skus
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
                            quantity: skus[i].totalQuantity,
                            fields: skus[i].fields,
                            images: skus[i].images,
                        });
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
                    quantity: event.sku.totalQuantity,
                    fields: event.sku.fields,
                    images: event.sku.images,
                });
                this.skus = [...this.skus];
                break;
        }
    }

    onSelectPresetReceiptTypeChange(event: any) {
        this.type = event.value;
    }

    onSelectPresetStatusChange(event: any) {
        this.status = event.value;
    }

    getUsername(email: any) {
        if (!email) {
            return null;
        }

        return email.split('@')[0];
    }
}
