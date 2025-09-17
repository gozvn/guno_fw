import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportsPageOverviewRevenueComponent} from './revenue.component';

describe('ReportsPageOverviewRevenueComponent', () => {
    let component: ReportsPageOverviewRevenueComponent;
    let fixture: ComponentFixture<ReportsPageOverviewRevenueComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReportsPageOverviewRevenueComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ReportsPageOverviewRevenueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
