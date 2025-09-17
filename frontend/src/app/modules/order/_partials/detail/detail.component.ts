import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Lightbox} from "ngx-lightbox";
import {BaseComponent} from "../../../core/components/base-component";
import {AuthenticationService} from "../../../../services/authentication.service";
import {InventoryDeliveryService} from "../../../warehouse/services/inventory.delivery.service";
import {
    WarehousePageDeliveryPartialDetailComponent
} from "../../../warehouse/pages/delivery/_partials/detail/detail.component";
import {OrderService} from "../../services/order.service";

@Component({
    selector: 'app-warehouse-page-delivery-partial-detail',
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class OrderPagePartialDetailComponent extends BaseComponent implements OnInit {

    orderId: any;
    order: any;
    skus: any = [];
    items: any = [];

    displayedColumns: string[] = [
        'sellerSku', 'productName', 'image', 'quantity', 'deliveryNumber', 'deliveryStatus', 'actions'
    ];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private dialog: MatDialog,
                private lightbox: Lightbox,
                private orderService: OrderService,
                private inventoryDeliveryService: InventoryDeliveryService,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
        super(activeRoute, translateService, authenticationService, injector);
        this.order = data?.order;
        this.orderId = data?.order_id;

        const items = this.order?.data?.items.map((e: any) => {
            let data = e.variation_info;
            data.quantity = e.quantity;
            return data;
        }) ?? [];
        this.items = items;
    }

    getOrderDetail() {
        this.orderService.getById(this.orderId).subscribe((result: any) => {
            this.order = result;
            const items = this.order?.data?.items.map((e: any) => {
                let data = e.variation_info;
                data.quantity = e.quantity;
                return data;
            }) ?? [];
            this.items = items;

            this.getItems();
        });
    }

    getItems() {
        if (!this.order) return;

        this.inventoryDeliveryService.getItemByOrderId(this.order.order_id).subscribe((result: any) => {
            this.skus = result?.items ?? [];
            this.items = this.items.map((e: any) => {
                let sku = this.skus.find((s: any) => s.seller_sku === e.display_id);
                if (typeof sku !== 'undefined') {
                    e.delivery_number = sku.delivery_number;
                    e.delivery_status = sku.delivery_status;
                }
                return e;
            });
        });
    }

    override ngOnInit() {
        if (!this.order && this.orderId) {
            this.getOrderDetail();
        }
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

    openDialogDetailDelivery(deliveryNumber: any) {
        const dialogRef = this.dialog.open(WarehousePageDeliveryPartialDetailComponent, {
            autoFocus: true,
            width: '95vw',
            height: 'auto',
            panelClass: 'warehouse-dialog-delivery-create',
            disableClose: true,
            data: {
                delivery_number: deliveryNumber
            }
        });
    }
}
