import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormControl } from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";
import { ProductSkuService } from "../../services/product.sku.service";
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import {Lightbox} from "ngx-lightbox";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {APP_CONFIG} from "../../../../../configs/app.config";
import {fromEvent, merge} from "rxjs";

@Component({
    selector: 'app-warehouse-sku-select',
    templateUrl: './sku-select.component.html',
    styleUrls: ['./sku-select.component.scss']
})
export class WarehouseSkuSelectComponent implements OnInit, AfterViewInit {
    skuControl = new FormControl();
    filteredSkus: any[] = [];
    selectedSku: any = null;

    selectedTabIndex = 0;
    productType: any = 'sku';
    productTypes: any = ['sku', 'product'];

    @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
    @ViewChild('inputSellerSku') inputSellerSku!: ElementRef<HTMLElement>;

    @Output() onEventSkuSelected = new EventEmitter<any>(); // 🔥 Bắn sự kiện ra ngoài

    constructor(private productSkuService: ProductSkuService,
                private lightbox: Lightbox) {}

    ngOnInit() {

    }

    private skipNextDebounce = false;

    ngAfterViewInit() {
        const valueChange$ = this.skuControl.valueChanges.pipe(
            debounceTime(4000),
            distinctUntilChanged(),
            filter(value => typeof value === 'string' && value.length >= 7),
            filter(() => {
                if (this.skipNextDebounce) {
                    this.skipNextDebounce = false; // bỏ qua 1 lần search debounce
                    return false;
                }
                return true;
            })
        );

        const enterPress$ = fromEvent<KeyboardEvent>(this.inputSellerSku.nativeElement, 'keydown').pipe(
            filter(event => event.key === 'Enter'),
            map(() => this.skuControl.value),
            filter(value => typeof value === 'string' && value.length >= 7),
            map(query => {
                this.skipNextDebounce = true; // đánh dấu bỏ qua debounce tiếp theo
                return query;
            })
        );

        merge(valueChange$, enterPress$).pipe(
            switchMap((query: string) => {
                this.inputSellerSku.nativeElement.setAttribute('disabled', 'true');
                return this.productSkuService.search({
                    keyword: query,
                    type: this.productType,
                    loadingState: false
                });
            })
        ).subscribe(results => {
            switch (this.productType) {
                case 'product':
                    this.filteredSkus = results.products;
                    break;
                case 'sku':
                default:
                    this.filteredSkus = results.skus;
                    break;
            }
            this.inputSellerSku.nativeElement.removeAttribute('disabled');
        });
    }

    onSkuSelected(event: MatAutocompleteSelectedEvent) {
        this.selectedSku = event.option.value;

        // ✅ Clear input (không emit lại)
        this.skuControl.setValue('', { emitEvent: false });

        // ✅ Clear suggestion list
        this.filteredSkus = [];

        // ✅ Đóng dropdown ngay
        setTimeout(() => this.autocompleteTrigger.closePanel(), 0);

        this.onEventSkuSelected.emit({
            sku: this.selectedSku,
            type: this.productType
        })
    }

    public onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = './assets/styles/default/images/profile/user-2.jpg';
        target.className = 'rounded image-gray';
    }

    openLightBox(caption: string, imageUrl: any): void { // open lightbox
        if (!imageUrl) return;

        const images: any = [{
            caption: caption,
            src: imageUrl
        }];
        this.lightbox.open(images, 0);
    }

    onTabChange(event: MatTabChangeEvent): void {
        this.productType = this.productTypes[event.index];
        this.skuControl.setValue('', { emitEvent: false });
        this.filteredSkus = [];
        // ✅ Đóng dropdown ngay
        setTimeout(() => this.autocompleteTrigger.closePanel(), 0);
    }
}
