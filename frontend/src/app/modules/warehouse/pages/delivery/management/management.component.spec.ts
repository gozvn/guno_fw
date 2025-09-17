import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageDeliveryManagementComponent} from './management.component';

describe('WarehousePageDeliveryManagementComponent', () => {
    let component: WarehousePageDeliveryManagementComponent;
    let fixture: ComponentFixture<WarehousePageDeliveryManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageDeliveryManagementComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageDeliveryManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
