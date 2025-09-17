import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderPageManagementComponent} from './management.component';

describe('OrderPageManagementComponent', () => {
    let component: OrderPageManagementComponent;
    let fixture: ComponentFixture<OrderPageManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderPageManagementComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OrderPageManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
