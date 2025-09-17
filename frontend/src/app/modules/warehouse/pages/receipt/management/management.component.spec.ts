import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageReceiptManagementComponent} from './management.component';

describe('WarehousePageReceiptManagementComponent', () => {
    let component: WarehousePageReceiptManagementComponent;
    let fixture: ComponentFixture<WarehousePageReceiptManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageReceiptManagementComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageReceiptManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
