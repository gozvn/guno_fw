import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FinanceDeptService} from "../../../../services/dept.service";
import {BaseComponent} from "../../../../../core/components/base-component";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../../services/authentication.service";
import {Lightbox} from "ngx-lightbox";

@Component({
    selector: 'app-finance-page-dept-partial-detail',
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class FinancePageDeptPartialDetailComponent extends BaseComponent implements OnInit {

    dept: any;
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
    supplierNames: any = [];
    supplierCustomId: any = 'not-set';
    supplierName: any = 'not-set';

    totalItems = 0;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private dialogRef: MatDialogRef<FinancePageDeptPartialDetailComponent>,
                private financeDeptService: FinanceDeptService,
                private lightbox: Lightbox,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
        super(activeRoute, translateService, authenticationService, injector);
        this.suppliers = data?.suppliers ?? [];
        this.dept = data.dept;
        this.supplierName = this.dept.supplier_name
        this.totalItems = this.dept?.total_quantity;
        this.status = this.dept?.status;
    }

    getItems() {
        this.isLoading = true;
        this.financeDeptService.getItemByNumber(this.dept.number).subscribe((result: any) => {
            this.skus = result?.items ?? [];
            this.isLoading = false;
        });

        this.supplierNames = this.suppliers.map((e: any) => e.name);
        this.supplierCustomIds.unshift('not-set');
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
        this.financeDeptService.update(this.dept, {
            skus: this.skus,
            status: this.status,
            description: this.dept.description
        }).subscribe((result: any) => {
            this.isLoading = false;
            const dept = result?.dept ?? false;
            if (dept) {
                this.dept.total_amount = dept.total_amount;
                this.dept.total_quantity = dept.total_quantity;
                this.dept.status = dept.status;
            }
            this.openSnackBar(this.translateService.instant('labels.updateSuccess'), '');
            this.dialogRef.close({
                dept: this.dept
            });
        });
    }

    onSelectPresetReceiptTypeChange(event: any) {
        this.type = event.value;
        // this.receipt.type = this.type;
    }

    onSelectPresetStatusChange(event: any) {
        this.status = event.value;
        // this.receipt.status = this.status;
    }

    onSelectPresetSupplierChange(event: any) {
        this.supplierCustomId = event.value;
    }

    getSupplierName(customId: any) {
        const supplier = this.suppliers.find((e: any) => e.custom_id === customId);
        return typeof supplier !== 'undefined' ? supplier.name : 'N/A'
    }

    onChangeQuantity(event: any, element: any) {
        element.quantity = event.target.value;
        this.totalItems = this.skus.reduce((sum: any, item: any) => sum + parseInt(item.quantity), 0);
    }

    onChangeCostPrice(event: any, element: any) {
        const costPrice = event.target.value.replace(/\D/g, '');
        element.costPrice = parseInt(costPrice);
    }

    getUsername(email: any) {
        if (!email) {
            return null;
        }

        return email.split('@')[0];
    }
}
