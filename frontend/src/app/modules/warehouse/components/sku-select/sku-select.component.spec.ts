import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehouseSkuSelectComponent} from './sku-select.component';

describe('WarehouseSkuSelectComponent', () => {
    let component: WarehouseSkuSelectComponent;
    let fixture: ComponentFixture<WarehouseSkuSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehouseSkuSelectComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehouseSkuSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
