import {AfterViewInit, ChangeDetectorRef, Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BaseComponent} from "../../../../../core/components/base-component";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../../../../../services/authentication.service";
import {Lightbox} from "ngx-lightbox";
import {StocktakingService} from "../../../../services/stocktaking.service";

@Component({
    selector: 'app-warehouse-page-stocktaking-partial-detail',
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class WarehousePageStocktakingPartialDetailComponent extends BaseComponent implements OnInit, AfterViewInit {

    item: any;
    skus: any = [];
    isLoading = false;
    displayedColumns: string[] = [
        'sellerSku', 'productName', 'image', 'note', 'quantityBefore', 'discrepancy', 'quantityAfter', 'actions'
    ];

    isTableScrolled = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public override activeRoute: ActivatedRoute,
                public override translateService: TranslateService,
                public override authenticationService: AuthenticationService,
                public override injector: Injector,
                private cdr: ChangeDetectorRef,
                private stocktakingService: StocktakingService,
                private lightbox: Lightbox,
                private clipboard: Clipboard,
                private snackBar: MatSnackBar) {
        super(activeRoute, translateService, authenticationService, injector);
        this.item = data?.receipt;
    }

    getItems() {
        this.isLoading = true;
        this.cdr.detectChanges();
        this.stocktakingService.getItemByNumber(this.item.number).subscribe((result: any) => {
            this.skus = result?.items ?? [];
            this.isLoading = false;
        });
    }

    override ngOnInit() {

    }

    override ngAfterViewInit() {
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

    getUsername(email: any) {
        if (!email) {
            return null;
        }

        return email.split('@')[0];
    }
}
