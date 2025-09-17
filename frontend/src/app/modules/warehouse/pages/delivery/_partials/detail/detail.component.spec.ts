import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageDeliveryPartialDetailComponent} from './detail.component';

describe('WarehousePageDeliveryPartialDetailComponent', () => {
    let component: WarehousePageDeliveryPartialDetailComponent;
    let fixture: ComponentFixture<WarehousePageDeliveryPartialDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageDeliveryPartialDetailComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageDeliveryPartialDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
