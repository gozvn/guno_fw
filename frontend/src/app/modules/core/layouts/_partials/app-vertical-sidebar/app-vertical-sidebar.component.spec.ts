import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppVerticalSidebarComponent} from './app-vertical-sidebar.component';

describe('AppHorizontalSidebarComponent', () => {
    let component: AppVerticalSidebarComponent;
    let fixture: ComponentFixture<AppVerticalSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppVerticalSidebarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AppVerticalSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
