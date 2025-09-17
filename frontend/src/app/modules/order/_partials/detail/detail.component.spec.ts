import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderPagePartialDetailComponent} from './detail.component';

describe('OrderPagePartialDetailComponent', () => {
    let component: OrderPagePartialDetailComponent;
    let fixture: ComponentFixture<OrderPagePartialDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrderPagePartialDetailComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OrderPagePartialDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
