import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageReceiptPartialCreateComponent} from './create.component';

describe('WarehousePageReceiptPartialCreateComponent', () => {
    let component: WarehousePageReceiptPartialCreateComponent;
    let fixture: ComponentFixture<WarehousePageReceiptPartialCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageReceiptPartialCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageReceiptPartialCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
