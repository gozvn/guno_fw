import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {InventoryDeliveryService} from "../../../../services/inventory.delivery.service";
import moment from "moment";
import {BaseComponent} from "../../../../../core/components/base-component";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../../services/authentication.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Lightbox} from "ngx-lightbox";

@Component({
    selector: 'app-warehouse-page-delivery-partial-detail',
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class WarehousePageDeliveryPartialDetailComponent extends BaseComponent implements OnInit {

    deliveryNumber: any;
    delivery: any;
    skus: any = [];

    displayedColumns: string[] = [
        'sellerSku', 'productName', 'image', 'quantity', 'actions'
    ];

    type = 'bill'
    presetReceiptTypes = ['bill', 'supplier_return', 'faulty_product'];

    status = 'done'
    presetStatues = ['done', 'confirmed', 'canceled', 'draft'];

    isTableScrolled = false;

    isLoading = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private lightbox: Lightbox,
                private inventoryDeliveryService: InventoryDeliveryService,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
        super(activeRoute, translateService, authenticationService, injector);
        this.deliveryNumber = data?.delivery_number;
        this.delivery = data?.delivery;
        this.type = this.delivery?.type;
        this.status = this.delivery?.status;
    }

    getItems() {
        this.isLoading = true;
        this.inventoryDeliveryService.getItemByNumber(this.delivery?.number ?? this.deliveryNumber).subscribe((result: any) => {
            this.delivery = result?.delivery ?? this.delivery;
            this.type = this.delivery?.type;
            this.status = this.delivery?.status;

            this.skus = result?.items ?? [];
            this.isLoading = false;
        });
    }

    override ngOnInit() {
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
        // this.isLoading = true;
        // this.inventoryDeliveryService.create({
        //     type: this.type,
        //     status: this.status,
        //     note: this.note,
        //     skus: this.skus
        // }).subscribe((result: any) => {
        //     this.isLoading = false;
        //     this.dialogRef.close(result)
        // });
    }

    onSelectPresetReceiptTypeChange(event: any) {
        this.type = event.value;
        // this.delivery.type = this.type;
    }

    onSelectPresetStatusChange(event: any) {
        this.status = event.value;
        // this.delivery.status = this.status;
    }

    getUsername(email: any) {
        if (!email) {
            return null;
        }

        return email.split('@')[0];
    }
}
