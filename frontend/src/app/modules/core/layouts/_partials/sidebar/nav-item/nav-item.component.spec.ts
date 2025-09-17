import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppNavItemComponent} from './nav-item.component';

describe('AppNavItemComponent', () => {
    let component: AppNavItemComponent;
    let fixture: ComponentFixture<AppNavItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppNavItemComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AppNavItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
