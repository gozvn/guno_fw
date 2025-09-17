import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardPageHomeComponent} from './home.component';

describe('DashboardPageHomeComponent', () => {
    let component: DashboardPageHomeComponent;
    let fixture: ComponentFixture<DashboardPageHomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardPageHomeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DashboardPageHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
