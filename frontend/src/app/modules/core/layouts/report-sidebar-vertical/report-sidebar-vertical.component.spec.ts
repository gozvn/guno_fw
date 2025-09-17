import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutReportSidebarVerticalComponent} from './report-sidebar-vertical.component';

describe('LayoutReportSidebarVerticalComponent', () => {
    let component: LayoutReportSidebarVerticalComponent;
    let fixture: ComponentFixture<LayoutReportSidebarVerticalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LayoutReportSidebarVerticalComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LayoutReportSidebarVerticalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
