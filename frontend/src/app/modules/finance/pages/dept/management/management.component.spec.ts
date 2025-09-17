import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FinancePageDeptManagementComponent} from './management.component';

describe('FinancePageDeptManagementComponent', () => {
    let component: FinancePageDeptManagementComponent;
    let fixture: ComponentFixture<FinancePageDeptManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FinancePageDeptManagementComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FinancePageDeptManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
