import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageReceiptPartialDetailComponent} from './detail.component';

describe('WarehousePageReceiptPartialDetailComponent', () => {
    let component: WarehousePageReceiptPartialDetailComponent;
    let fixture: ComponentFixture<WarehousePageReceiptPartialDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageReceiptPartialDetailComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageReceiptPartialDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
