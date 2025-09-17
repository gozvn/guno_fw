import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FinancePageDeptPartialDetailComponent} from './detail.component';

describe('FinancePageDeptPartialDetailComponent', () => {
    let component: FinancePageDeptPartialDetailComponent;
    let fixture: ComponentFixture<FinancePageDeptPartialDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FinancePageDeptPartialDetailComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FinancePageDeptPartialDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
