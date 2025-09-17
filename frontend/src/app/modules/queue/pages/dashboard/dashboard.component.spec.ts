import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QueuePageDashboardComponent} from './dashboard.component';

describe('QueuePageDashboardComponent', () => {
    let component: QueuePageDashboardComponent;
    let fixture: ComponentFixture<QueuePageDashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QueuePageDashboardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(QueuePageDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
