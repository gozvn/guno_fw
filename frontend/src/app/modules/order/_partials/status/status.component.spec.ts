import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageDeliveryPartialSourceLogoComponent} from './source-logo.component';

describe('WarehousePageDeliveryPartialSourceLogoComponent', () => {
    let component: WarehousePageDeliveryPartialSourceLogoComponent;
    let fixture: ComponentFixture<WarehousePageDeliveryPartialSourceLogoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageDeliveryPartialSourceLogoComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageDeliveryPartialSourceLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
