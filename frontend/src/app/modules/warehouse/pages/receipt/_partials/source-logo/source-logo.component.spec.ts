import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageReceiptPartialSourceLogoComponent} from './source-logo.component';

describe('WarehousePageReceiptPartialSourceLogoComponent', () => {
    let component: WarehousePageReceiptPartialSourceLogoComponent;
    let fixture: ComponentFixture<WarehousePageReceiptPartialSourceLogoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageReceiptPartialSourceLogoComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageReceiptPartialSourceLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
