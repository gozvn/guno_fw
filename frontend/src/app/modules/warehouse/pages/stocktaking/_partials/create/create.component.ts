import {ChangeDetectorRef, Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseComponent} from "../../../../../core/components/base-component";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../../services/authentication.service";
import {Lightbox} from "ngx-lightbox";
import {StocktakingService} from "../../../../services/stocktaking.service";
import * as XLSX from 'xlsx';
import {InventoryService} from "../../../../services/inventory.service";

@Component({
    selector: 'app-warehouse-page-stocktaking-partial-create',
    templateUrl: './create.component.html',
    styleUrl: './create.component.scss'
})
export class WarehousePageStocktakingPartialCreateComponent extends BaseComponent implements OnInit {

    item: any;
    note: string = '';
    skus: any = [];
    isLoading = false;
    displayedColumns: string[] = [
        'sellerSku', 'productName', 'image', 'onHandLogic', 'diff', 'quantityAfter', 'actions'
    ];

    isTableScrolled = false;

    totalSku = 0;
    totalQuantityOnHand = 0;
    totalQuantityDiff = 0;
    totalQuantityAfter = 0;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private dialogRef: MatDialogRef<WarehousePageStocktakingPartialCreateComponent>,
                private cdr: ChangeDetectorRef,
                private stocktakingService: StocktakingService,
                private inventoryService: InventoryService,
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
        this.stocktakingService.create({
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

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file: File = input.files[0];
        const reader: FileReader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            // Kiểm tra số sheet
            if (workbook.SheetNames.length < 2) {
                console.error('File không có đủ 2 sheet');
                return;
            }

            const sheetName = workbook.SheetNames[1]; // Sheet thứ 2 (index = 1)
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: '' });

            if (!jsonData.length) return;

            for (const i in jsonData) {
                const row = jsonData[i];
                this.skus.push({
                    seller_sku: row['Sản phẩm'],
                    onHand: 0,
                    quantity: row['Số lượng']
                });
                this.totalSku++;
            }
            this.skus = [...this.skus];
            this.cdr.detectChanges(); // nếu mat-table không tự cập nhật
            this.getInventoryInfo(this.skus);
        };

        reader.readAsArrayBuffer(file);
    }

    removeSku(item: any) {
        this.skus = this.skus.filter((e: any) => e.seller_sku !== item.seller_sku);
        this.cdr.detectChanges(); // nếu mat-table không tự cập nhật
        this.updateStats();
    }

    onEventSkuSelected(event: any) {
        this.skus.push({
            seller_sku: event.sku.code,
            quantity: 0,
            fields: event.sku.fields,
            images: event.sku.images,
        });
        this.skus = [...this.skus];
        this.getInventoryInfo([{
            seller_sku: event.sku.code
        }]);
        this.totalSku++;
    }

    getUsername(email: any) {
        if (!email) {
            return null;
        }

        return email.split('@')[0];
    }

    getInventoryInfo(skus: any) {
        const sellerSkus = skus.map((e: any) => e.seller_sku);
        const filters = {
            'seller-skus': sellerSkus.join(',')
        }
        this.isLoading = true;
        this.inventoryService.search(filters).subscribe((result: any) => {
            this.isLoading = false;
            const skuData = result.skus;

            const arr2Map = new Map(skuData.map((el: any) => [el.code, el.onHand]));

            skuData.forEach((e: any) => {
                const index = this.skus.findIndex((el: any) => el.seller_sku === e.code);
                if (index >= 0) {
                    this.skus[index].onHand = arr2Map.get(e.code);
                    this.totalQuantityOnHand += this.skus[index].onHand
                    this.totalQuantityDiff += this.skus[index].quantity - this.skus[index].onHand
                    this.totalQuantityAfter += this.skus[index].quantity;
                }
            });
        });
    }

    updateStats() {
        this.totalSku = 0;
        this.totalQuantityOnHand = 0;
        this.totalQuantityDiff = 0;
        this.totalQuantityAfter = 0;

        this.skus.forEach((e: any) => {
            this.totalSku++;
            this.totalQuantityOnHand += e.onHand;
            this.totalQuantityDiff += e.quantity - e.onHand;
            this.totalQuantityAfter += e.quantity;
        })

    }
}
