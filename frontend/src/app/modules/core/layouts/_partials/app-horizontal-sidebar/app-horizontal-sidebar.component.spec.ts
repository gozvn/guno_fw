import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppHorizontalSidebarComponent} from './app-horizontal-sidebar.component';

describe('AppHorizontalSidebarComponent', () => {
    let component: AppHorizontalSidebarComponent;
    let fixture: ComponentFixture<AppHorizontalSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppHorizontalSidebarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AppHorizontalSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
