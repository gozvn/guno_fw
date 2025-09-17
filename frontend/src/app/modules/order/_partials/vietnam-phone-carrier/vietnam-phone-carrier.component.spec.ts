import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderPartialVietnamPhoneCarrierComponent} from './vietnam-phone-carrier.component';

describe('OrderPartialVietnamPhoneCarrierComponent', () => {
    let component: OrderPartialVietnamPhoneCarrierComponent;
    let fixture: ComponentFixture<OrderPartialVietnamPhoneCarrierComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderPartialVietnamPhoneCarrierComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OrderPartialVietnamPhoneCarrierComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
