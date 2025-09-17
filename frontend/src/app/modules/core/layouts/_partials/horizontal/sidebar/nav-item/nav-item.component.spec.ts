import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppHorizontalNavItemComponent} from './nav-item.component';

describe('AppHorizontalNavItemComponent', () => {
    let component: AppHorizontalNavItemComponent;
    let fixture: ComponentFixture<AppHorizontalNavItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppHorizontalNavItemComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AppHorizontalNavItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
