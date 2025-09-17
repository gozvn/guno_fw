import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageStatsSkuComponent} from './sku.component';

describe('WarehousePageStatsSkuComponent', () => {
    let component: WarehousePageStatsSkuComponent;
    let fixture: ComponentFixture<WarehousePageStatsSkuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageStatsSkuComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageStatsSkuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
