import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehousePageDeliveryPartialCreateComponent} from './create.component';

describe('WarehousePageDeliveryPartialCreateComponent', () => {
    let component: WarehousePageDeliveryPartialCreateComponent;
    let fixture: ComponentFixture<WarehousePageDeliveryPartialCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WarehousePageDeliveryPartialCreateComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WarehousePageDeliveryPartialCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
